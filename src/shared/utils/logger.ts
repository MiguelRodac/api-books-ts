export class Logger {
  static info(message: string, meta?: any): void {
    console.log(
      `[INFO] ${new Date().toISOString()}: ${message}`,
      meta ? JSON.stringify(meta, null, 2) : ""
    );
  }

  static error(message: string, error?: any): void {
    console.error(
      `[ERROR] ${new Date().toISOString()}: ${message}`,
      error ? JSON.stringify(error, null, 2) : ""
    );
  }

  static warn(message: string, meta?: any): void {
    console.warn(
      `[WARN] ${new Date().toISOString()}: ${message}`,
      meta ? JSON.stringify(meta, null, 2) : ""
    );
  }

  static debug(message: string, meta?: any): void {
    if (process.env.NODE_ENV === "development") {
      console.debug(
        `[DEBUG] ${new Date().toISOString()}: ${message}`,
        meta ? JSON.stringify(meta, null, 2) : ""
      );
    }
  }
}
