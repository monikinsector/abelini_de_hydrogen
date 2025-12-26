import fs from "fs";

const REPORT_PATH = "reports/custom-critical-report.json";

if (!fs.existsSync(REPORT_PATH)) {
  console.error("Custom critical report not found");
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(REPORT_PATH, "utf-8"));

const criticalIssues = report.issues.filter(
  issue => issue.level === "CRITICAL"
);

if (criticalIssues.length > 0) {
  console.error("CUSTOM CRITICAL ISSUES DETECTED:\n");

  criticalIssues.forEach(issue => {
    console.error(
      `- [${issue.rule}] ${issue.message}\n  File: ${issue.file}\n`
    );
  });

  console.error("Pipeline blocked due to critical issues");
  process.exit(1);
}

console.log("No custom critical issues found");
