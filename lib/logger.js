import winston from "winston";

const logFormat = winston.format.printf(({ level, message, timestamp, label }) => {
  return `${timestamp} [${label || "app"}] ${level.toUpperCase()}: ${message}`;
});

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat),
    }),
  ],
});

export default logger;
