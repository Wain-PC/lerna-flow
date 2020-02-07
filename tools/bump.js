const spawn = require("./spawn");
const ask = require("./ask");
const askString = require("./askString");
const gitTask = require("./gitTask");

module.exports = async ({ type, tag, push }) => {
  const taskId = await gitTask();
  const commitMessage = (
    await askString("Commit message", `${taskId} Bump package versions`)
  ).replace(/\s/g, " ");

  const useHooks = await ask("Skip git commit hooks?");
  const typeStr = type || "";
  const pushStr = push ? "" : "--no-push";
  const commitMessageStr = commitMessage ? `-m "${commitMessage}"` : "";
  const tagStr = tag ? `--preid "${tag}"` : "";
  const exactStr = "--exact";
  const includeMergedTags = "--include-merged-tags";
  const hooksStr = useHooks ? "--no-commit-hooks" : "";

  const command = [
    "lerna version",
    typeStr,
    pushStr,
    commitMessageStr,
    tagStr,
    exactStr,
    includeMergedTags,
    hooksStr
  ]
    .filter(v => v)
    .join(" ");
  // Run in the shell to allow interactive behavior
  await spawn(command, { shell: true });
};
