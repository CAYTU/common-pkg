/**
 * Logger class to handle application logging.
 * Provides support for multiple log levels, timestamps, JSON formatting, and external integrations.
 */
export class Logger {
  /**
   * Logs a message with "info" level.
   * @param message - The message to log.
   * @param meta - Optional metadata to include.
   */
  static info(message: string, meta?: Record<string, unknown>): void {
    this.log("INFO", message, meta);
  }

  /**
   * Logs a message with "warn" level.
   * @param message - The warning message to log.
   * @param meta - Optional metadata to include.
   */
  static warn(message: string, meta?: Record<string, unknown>): void {
    this.log("WARN", message, meta);
  }

  /**
   * Logs a message with "error" level.
   * @param message - The error message to log.
   * @param error - Optional error object to include additional details.
   * @param meta - Optional metadata to include.
   */
  static error(
    message: string,
    error?: Error,
    meta?: Record<string, unknown>,
  ): void {
    const errorDetails = error
      ? { name: error.name, message: error.message, stack: error.stack }
      : {};
    this.log("ERROR", message, { ...errorDetails, ...meta });
  }

  /**
   * Internal method to handle logging.
   * @param level - The log level (INFO, WARN, ERROR).
   * @param message - The log message.
   * @param meta - Optional metadata to include.
   */
  private static log(
    level: string,
    message: string,
    meta?: Record<string, unknown>,
  ): void {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      meta,
    };

    // Format log for output
    const formattedLog = JSON.stringify(logEntry, null, 2);

    // Console output
    if (level === "ERROR") {
      console.error(formattedLog);
    } else if (level === "WARN") {
      console.warn(formattedLog);
    } else {
      console.log(formattedLog);
    }

    // Future extension: Send logs to external systems (e.g., Sentry, Datadog, etc.)
    this.sendToExternalSystem(logEntry);
  }

  /**
   * Sends log entry to external systems (e.g., log aggregators or monitoring tools).
   * @param logEntry - The log entry to send.
   */
  private static sendToExternalSystem(logEntry: Record<string, unknown>): void {
    // Placeholder for integration with external logging/monitoring tools.
    // Example: HTTP request to an API endpoint, sending logs to Sentry, etc.
    // Uncomment and configure based on your needs.
    /*
      fetch('https://logging-service.example.com/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logEntry),
      });
      */
  }

  /**
   * Configures global logging settings (e.g., log level thresholds, external endpoints).
   * @param options - Configuration options.
   */
  static configure(options: {
    externalEndpoint?: string;
    logLevel?: string;
  }): void {
    // Placeholder for configuration logic (e.g., setting log level, external API endpoints, etc.)
    // Example:
    // this.externalEndpoint = options.externalEndpoint;
    // this.logLevel = options.logLevel;
  }
}
