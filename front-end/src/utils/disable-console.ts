// This script disables all console logging functions (log, error, warn, and info) in a production environment
// to prevent debug or informational messages from appearing in the browser's console. It first checks if the
// code is running in a browser environment (using `typeof window !== "undefined"`) and if the environment
// variable `NEXT_PUBLIC_ENVIRONMENT` is set to "production". If both conditions are met, the console methods
// are overridden with empty functions, effectively silencing them in production.

// Check if the code is running in a browser environment and the environment is set to "production".
if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_ENVIRONMENT === "production") {
    // Override console.log to disable logging in production.
    console.log = () => { };
    // Override console.error to disable error logging in production.
    console.error = () => { };
    // Override console.warn to disable warning logging in production.
    console.warn = () => { };
    // Override console.info to disable informational logging in production.
    console.info = () => { };
}