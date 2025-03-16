import cors from "cors";                                    // Middleware for enabling Cross-Origin Resource Sharing
import express from "express";                              // Web framework for Node.js


import cookieParser from 'cookie-parser';                   // Middleware for parsing cookies
import ErrorHandler from "./middlewares/ErrorHandler.js";   // Importing the ErrorHandler class
import NotFound from "./middlewares/NotFound.js";           // Importing the NotFound middleware


import WellcomeController from "./domains/wellcome/wellcome.controller.js";     // Importing the WellcomeController


const app = express();                                      // Creating an instance of an Express application


app.use(cors({
    origin: '*',                                            // Allowing all origins
    credentials: true,                                      // Allowing credentials (cookies, authorization headers, etc.)
    methods: ['GET', 'POST', 'PATCH', 'DELETE']             // Allowing specific HTTP methods
}));


app.use(cookieParser());                                    // Using cookie-parser middleware to parse cookies
app.use(express.json());                                    // Using express.json middleware to parse JSON bodies
app.use(express.urlencoded({ extended: false }));           // Using express.urlencoded middleware to parse URL-encoded bodies


app.get('/api', WellcomeController.index);                  // Setting up a route for the WellcomeController


app.use(NotFound);                                          // Using the NotFound middleware
app.use(ErrorHandler);                                      // Using the ErrorHandler middleware


export default app;                                         // Exporting the Express application