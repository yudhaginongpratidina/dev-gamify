import { PrismaClient } from "@prisma/client";          // Import the PrismaClient from the @prisma/client package
import logger from "./logger.js";                       // Import the logger instance from the logger.js file
const isProd = process.env.NODE_ENV === 'production';   // Check if the current environment is production

// Create a new PrismaClient instance with logging configuration
const prisma = new PrismaClient({
    log: isProd ? [{ emit: "event", level: "error" }] : [
        { emit: "event", level: "query" },
        { emit: "event", level: "error" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" }
    ]
});

// Define log event handlers for different log levels
const logEvents = {
    query: (e) => logger.info(`Query: ${e.query} - Duration: ${e.duration}ms`), // Log query events
    error: (e) => logger.error(e),                                              // Log error events
    warn: (e) => logger.warn(e),                                                // Log warning events
    info: (e) => logger.info(e)                                                 // Log info events
};

// Attach log event handlers to the PrismaClient instance
Object.keys(logEvents).forEach((level) => {
    prisma.$on(level, logEvents[level]);
});

// Handle process termination and disconnect PrismaClient
process.on("SIGINT", async () => {
    await prisma.$disconnect();     // Disconnect PrismaClient
    process.exit(0);                // Exit the process
});

export default prisma;