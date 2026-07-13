// Boots the SQLite DB and the daily APMC cron once per server process.
// `require` (rather than `import`) is intentional here so that webpack does
// not try to bundle these Node-only modules for the Edge runtime.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await require("./instrumentation.node.js");
  }
}
