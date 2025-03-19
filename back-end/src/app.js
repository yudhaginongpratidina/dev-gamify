import cors from "cors";                                    // Middleware for enabling Cross-Origin Resource Sharing
import express from "express";                              // Web framework for Node.js


import cookieParser from 'cookie-parser';                   // Middleware for parsing cookies
import VerifyToken from "./middlewares/VerifyToken.js";     // Importing the VerifyToken middleware
import Me from "./middlewares/Me.js";                       // Importing the Me middleware  
import ErrorHandler from "./middlewares/ErrorHandler.js";   // Importing the ErrorHandler class
import NotFound from "./middlewares/NotFound.js";           // Importing the NotFound middleware


import WellcomeController from "./domains/wellcome/wellcome.controller.js";     // Importing the WellcomeController
import AuthController from "./domains/auth/auth.controller.js";                 // Importing the AuthController
import AccountController from "./domains/account/account.controller.js";        // Importing the AccountController


const app = express();                                      // Creating an instance of an Express application


app.use(cors({
    origin: 'http://localhost:3000',                                            // Allowing all origins
    credentials: true,                                      // Allowing credentials (cookies, authorization headers, etc.)
    methods: ['GET', 'POST', 'PATCH', 'DELETE']             // Allowing specific HTTP methods
}));


app.use(cookieParser());                                    // Using cookie-parser middleware to parse cookies
app.use(express.json());                                    // Using express.json middleware to parse JSON bodies
app.use(express.urlencoded({ extended: false }));           // Using express.urlencoded middleware to parse URL-encoded bodies


// Setting up a route for the WellcomeController
app.get('/api', WellcomeController.index);


// Setting up a route for the AuthController
app.post('/api/auth/register', AuthController.register);    
app.post('/api/auth/login', AuthController.login);
app.get('/api/auth/logout', AuthController.logout);
app.get('/api/auth/refresh-token', AuthController.refresh_token);

// Setting up a route for the AccountController
app.get('/api/account/:id', VerifyToken, AccountController.show);
app.patch('/api/account/:id', VerifyToken, Me, AccountController.update);
app.delete('/api/account/:id', VerifyToken, Me, AccountController.delete);


app.use(NotFound);                                          // Using the NotFound middleware
app.use(ErrorHandler);                                      // Using the ErrorHandler middleware


export default app;                                         // Exporting the Express application