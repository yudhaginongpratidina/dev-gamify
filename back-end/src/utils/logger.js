// Import the winston logging library and the daily rotate file transport
import winston from 'winston';
import 'winston-daily-rotate-file';

// Set the logging level to 'silly' which is the lowest level and logs everything
const logLevel = 'silly';

// Configure the daily rotate file transport
const fileTransport = new winston.transports.DailyRotateFile({
    filename: './logs/app-%DATE%.log',  // Log file name pattern
    datePattern: 'YYYY-MM-DD',          // Date pattern for log file rotation
    zippedArchive: true,                // Compress old log files
    maxSize: '1m',                      // Maximum size of the log file before rotation
    maxFiles: '14d',                    // Keep log files for 14 days
    level: 'error',                     // Log level for this transport
    handleExceptions: true              // Handle exceptions and log them
});

// Define the log format
const logFormat = winston.format.combine(
    winston.format.json({ space: 2 }),                                                                  // Format logs as JSON with 2 spaces indentation
    winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),                                  // Add timestamp to logs
    winston.format.label({ label: '[LOGGER]' }),                                                        // Add a label to logs
    winston.format.printf((info) => `${info.label} ${info.timestamp} ${info.level} : ${info.message}`)  // Custom log message format
);

// Create the logger instance
const logger = winston.createLogger({
    level: logLevel,                                        // Set the logging level
    format: logFormat,                                      // Set the log format
    transports: [
        new winston.transports.Console({
            level: logLevel,                                // Set the logging level for console transport
            handleExceptions: true,                         // Handle exceptions and log them
            format: winston.format.combine(
                winston.format.colorize({ all: true })      // Colorize the console logs
            )
        }),
        fileTransport                                       // Add the file transport
    ]
});

// Export the logger instance as the default export
export default logger;