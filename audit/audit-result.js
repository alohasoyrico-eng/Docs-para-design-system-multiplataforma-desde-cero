const { result } = require("./audit-context.js");

function finishAudit() {
  if (result.errors.length) result.status = "fail";
  console.log(JSON.stringify(result, null, 2));
  if (result.errors.length) process.exitCode = 1;
}

module.exports = { finishAudit };
