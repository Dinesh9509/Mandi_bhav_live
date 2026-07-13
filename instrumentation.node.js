module.exports = (async () => {
  const { ensureDb } = await import("./lib/db.js");
  const { startCron } = await import("./lib/cron.js");
  try {
    await ensureDb();
  } catch (err) {
    console.error("DB init failed during instrumentation:", err);
  }
  await startCron();
})();
