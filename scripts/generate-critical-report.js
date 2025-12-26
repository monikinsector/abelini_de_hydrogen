import fs from "fs";
import path from "path";

const SRC_DIRS = ["app", "server.ts"];
const RULES_PATH = "rules/critical-rules.json";
const REPORT_PATH = "reports/custom-critical-report.json";

if (!fs.existsSync(RULES_PATH)) {
  console.error("Critical rules file not found");
  process.exit(1);
}

const { rules } = JSON.parse(fs.readFileSync(RULES_PATH, "utf-8"));
const issues = [];

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");

  rules.forEach(rule => {
    const regex = new RegExp(rule.pattern, "g");
    if (regex.test(content)) {
      issues.push({
        level: rule.level,
        rule: rule.id,
        message: rule.description,
        file: filePath
      });
    }
  });
}

function scanDir(targetPath) {
  if (!fs.existsSync(targetPath)) return;

  const stat = fs.statSync(targetPath);

  if (stat.isFile()) {
    if (targetPath.endsWith(".js") || targetPath.endsWith(".ts")) {
      scanFile(targetPath);
    }
    return;
  }

  fs.readdirSync(targetPath).forEach(item => {
    scanDir(path.join(targetPath, item));
  });
}

SRC_DIRS.forEach(scanDir);

fs.mkdirSync("reports", { recursive: true });
fs.writeFileSync(
  REPORT_PATH,
  JSON.stringify({ issues }, null, 2)
);

console.log(`Critical scan completed. Issues found: ${issues.length}`);
