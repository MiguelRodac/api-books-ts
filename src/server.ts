import "dotenv/config";
import app from "./app";
import { Logger } from "./shared/utils/logger";
import { AppDataSource } from "./config/db/db";

const PORT = process.env.PORT || 3000;

/**
 * Start the server.
 */
const start = async () => {
  try {
    // Connect to the database
    await AppDataSource.initialize();
    Logger.info("📦 Database connected");

    app.listen(PORT, () => {
      Logger.info(`🚀 Server running on port ${PORT}`);
      Logger.info(`📚 API docs: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

/**
 * Event handler for SIGINT (Ctrl+C) signal.
 * @param signal The signal received (SIGINT in this case).
 */
process.on("SIGINT", () => {
  Logger.info("\n🔴 Server shutting down...");
  process.exit(0);
});

start();
