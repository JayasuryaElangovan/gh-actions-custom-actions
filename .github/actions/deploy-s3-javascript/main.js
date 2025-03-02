const core = require("@actions/core");
// const github = require("@actions/github");
const exec = require("@actions/exec");
function run() {
  const bucket = core.getInput("bucket-name", { required: true });
  const region = core.getInput("region", { required: true });
  const dist = core.getInput("dist-folder", { required: true });
  const s3uri = `s3://${bucket}/`;

  exec.exec(`aws s3 sync ${dist} ${s3uri} --region ${region}`);
  core.notice("Hello from my custome js action");
  const websiteurl = `http://${bucket}.s3-website-${region}.amazonaws.com`;
  core.setOutput("website-url", websiteurl);
}
run();
