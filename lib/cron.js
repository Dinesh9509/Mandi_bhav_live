import cron from "node-cron";
import logger from "./logger.js";
import { fetchAndSaveApmcData } from "./apmcService.js";
import { fetchAndSaveAgmarknetData } from "./agmarknetService.js";
import { ensureDb } from "./db.js";

let _started = false;

// Try Agmarknet (real, comprehensive data) first; fall back to Rajkisan
// (limited, often broken) only if Agmarknet is unconfigured or fails.
async function runDailyFetch() {
  try {
    const result = await fetchAndSaveAgmarknetData();
    if (result?.skipped) {
      logger.info("Agmarknet skipped, trying Rajkisan fallback", { label: "cron" });
      await fetchAndSaveApmcData();
    }
  } catch (e) {
    logger.error(`Agmarknet failed (${e.message}); falling back to Rajkisan`, { label: "cron" });
    await fetchAndSaveApmcData();
  }
}

export async function startCron() {
  if (_started) return;
  _started = true;

  if (process.env.DISABLE_CRON === "1") {
    logger.info("Cron disabled via DISABLE_CRON=1", { label: "cron" });
    return;
  }

  try {
    await ensureDb();
    logger.info("Running daily mandi fetch on startup", { label: "cron" });
    runDailyFetch().catch((e) =>
      logger.error(`Initial daily fetch failed: ${e.message}`, { label: "cron" })
    );

    cron.schedule(
      "0 6 * * *",
      async () => {
        const start = new Date().toISOString();
        logger.info(`Scheduled mandi fetch started at ${start}`, { label: "cron" });
        try {
          await runDailyFetch();
          logger.info(`Scheduled mandi fetch finished at ${new Date().toISOString()}`, { label: "cron" });
        } catch (e) {
          logger.error(`Scheduled mandi fetch failed: ${e.message}`, { label: "cron" });
        }
      },
      { timezone: "Asia/Kolkata" }
    );

    logger.info("Daily mandi cron scheduled (6:00 AM IST)", { label: "cron" });
  } catch (err) {
    logger.error(`Cron startup error: ${err.message}`, { label: "cron" });
  }
}
