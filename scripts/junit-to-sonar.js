#!/usr/bin/env node
/**
 * Converts JUnit XML (karma-junit-reporter output) to
 * SonarQube Generic Test Execution format.
 *
 * Usage: node scripts/junit-to-sonar.js <input.xml> <output.xml>
 */

var fs   = require("fs");
var path = require("path");

var inputFile  = process.argv[2];
var outputFile = process.argv[3];

if (!inputFile || !outputFile) {
  console.error("Usage: node junit-to-sonar.js <input.xml> <output.xml>");
  process.exit(1);
}

if (!fs.existsSync(inputFile)) {
  console.error("Input file not found: " + inputFile);
  process.exit(1);
}

var xml = fs.readFileSync(inputFile, "utf8");

// ── Parse test suites ──────────────────────────────────────────────────────
var suites = [];
var suiteRe = /<testsuite\b([^>]*)>([\s\S]*?)<\/testsuite>/g;
var suiteMatch;

while ((suiteMatch = suiteRe.exec(xml)) !== null) {
  var suiteAttrs = suiteMatch[1];
  var suiteBody  = suiteMatch[2];

  var nameMatch = /\bname="([^"]*)"/.exec(suiteAttrs);
  var suiteName = nameMatch ? nameMatch[1] : "UnknownSuite";

  var cases = [];
  var caseRe = /<testcase\b([^>]*?)(\/>|>([\s\S]*?)<\/testcase>)/g;
  var caseMatch;

  while ((caseMatch = caseRe.exec(suiteBody)) !== null) {
    var attrs    = caseMatch[1];
    var body     = caseMatch[3] || "";

    var caseNameMatch = /\bname="([^"]*)"/.exec(attrs);
    var timeMatch     = /\btime="([^"]*)"/.exec(attrs);

    var caseName = caseNameMatch ? caseNameMatch[1] : "unknownTest";
    var timeVal  = timeMatch ? parseFloat(timeMatch[1]) : 0;
    var durationMs = Math.round(timeVal * 1000);

    var status = "ok";
    if (/<failure\b/i.test(body))  { status = "failure"; }
    else if (/<error\b/i.test(body)) { status = "error"; }
    else if (/<skipped\b/i.test(body)) { status = "skipped"; }

    cases.push({
      name:       caseName,
      duration:   durationMs,
      status:     status,
      body:       body
    });
  }

  suites.push({ name: suiteName, cases: cases });
}

// ── Map suite name → source file path ─────────────────────────────────────
// karma-junit-reporter writes the classname as the HTML page path.
// We map that back to the JS test file for SonarQube.
function suiteToFilePath(suiteName) {
  // suiteName examples:
  //   "webapp/test/unit/unitTests.qunit.html Main Controller - Instantiation"
  //   "KarmaTests"
  if (/unit/.test(suiteName)) {
    return "webapp/test/unit/controller/Main.controller.js";
  }
  if (/integration|opa/i.test(suiteName)) {
    return "webapp/test/integration/NavigationJourney.js";
  }
  return "webapp/test/unit/controller/Main.controller.js";
}

// ── Build output XML ───────────────────────────────────────────────────────
function escapeXml(s) {
  return String(s)
    .replace(/&/g,  "&amp;")
    .replace(/</g,  "&lt;")
    .replace(/>/g,  "&gt;")
    .replace(/"/g,  "&quot;")
    .replace(/'/g,  "&apos;");
}

var lines = [];
lines.push('<?xml version="1.0" encoding="UTF-8"?>');
lines.push('<testExecutions version="1">');

// Group cases by file path
var fileMap = {};

suites.forEach(function (suite) {
  var filePath = suiteToFilePath(suite.name);
  if (!fileMap[filePath]) {
    fileMap[filePath] = [];
  }
  suite.cases.forEach(function (tc) {
    fileMap[filePath].push(tc);
  });
});

Object.keys(fileMap).forEach(function (filePath) {
  lines.push('  <file path="' + escapeXml(filePath) + '">');
  fileMap[filePath].forEach(function (tc) {
    if (tc.status === "ok") {
      lines.push(
        '    <testCase name="' + escapeXml(tc.name) +
        '" duration="' + tc.duration + '"/>'
      );
    } else if (tc.status === "skipped") {
      lines.push(
        '    <testCase name="' + escapeXml(tc.name) +
        '" duration="' + tc.duration + '">');
      lines.push('      <skipped message="skipped"/>');
      lines.push('    </testCase>');
    } else {
      var tag = tc.status === "failure" ? "failure" : "error";
      // Extract message from body
      var msgMatch = /message="([^"]*)"/.exec(tc.body);
      var msg = msgMatch ? msgMatch[1] : tc.status;
      lines.push(
        '    <testCase name="' + escapeXml(tc.name) +
        '" duration="' + tc.duration + '">');
      lines.push(
        '      <' + tag + ' message="' + escapeXml(msg) + '"/>');
      lines.push('    </testCase>');
    }
  });
  lines.push('  </file>');
});

lines.push('</testExecutions>');

var outputDir = path.dirname(outputFile);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputFile, lines.join("\n") + "\n", "utf8");
console.log("SonarQube test execution report written to: " + outputFile);