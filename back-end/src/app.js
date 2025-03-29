import cors from "cors";                                    // Middleware for enabling Cross-Origin Resource Sharing
import express from "express";                              // Web framework for Node.js


import cookieParser from 'cookie-parser';                   // Middleware for parsing cookies
import VerifyToken from "./middlewares/VerifyToken.js";     // Importing the VerifyToken middleware
import Me from "./middlewares/Me.js";                       // Importing the Me middleware  
import ErrorHandler from "./middlewares/ErrorHandler.js";   // Importing the ErrorHandler class
import NotFound from "./middlewares/NotFound.js";           // Importing the NotFound middleware


import WellcomeController from "./domains/wellcome/wellcome.controller.js";                 // Importing the WellcomeController
import AuthController from "./domains/auth/auth.controller.js";                             // Importing the AuthController
import AccountController from "./domains/account/account.controller.js";                    // Importing the AccountController
import AuthorizationController from "./domains/authorization/authorization.controller.js";  // Importing the AuthorizationController
import ClassController from "./domains/class/class.controller.js";                          // Importing the ClassController
import ChapterController from "./domains/chapter/chapter.controller.js";                    // Importing the ChapterController


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

// Setting up a route for the AuthorizationController
app.get('/api/authorization', VerifyToken, AuthorizationController.getAllUser);
app.get('/api/authorization/:userId', VerifyToken, AuthorizationController.getUserById);
app.patch('/api/authorization/:userId', VerifyToken, AuthorizationController.changeRole);

// Setting up a route for the ClassController
app.post('/api/class', VerifyToken, ClassController.create);
app.get('/api/class', ClassController.findAll);
app.get('/api/class/:classId', ClassController.findById);
app.get('/api/class/author/:authorId', ClassController.findByAuthorId);
app.patch('/api/class/author/:id/:classId', VerifyToken, Me, ClassController.update);
app.delete('/api/class/author/:id/:classId', VerifyToken, Me,  ClassController.softDelete);

// Setting up a route for the ClassController (trash and restore)
app.get('/api/class/author/:id/trash' , VerifyToken, Me, ClassController.trash);
app.patch('/api/class/author/:id/:classId/restore', VerifyToken, Me, ClassController.restore);

// Setting up a route for the ChapterController
app.post('/api/chapter', VerifyToken, ChapterController.create);
app.get('/api/chapter/:chapterId', ChapterController.findDetailByChapterId);
app.get('/api/chapter/class/:classId', ChapterController.findAllByClassId);
app.get('/api/chapter/author/:id/chapter/:chapterId', VerifyToken, Me, ChapterController.findDetailByChapterId);
app.patch('/api/chapter/author/:id/chapter/:chapterId', VerifyToken, Me, ChapterController.updateByChapterId);
app.delete('/api/chapter/author/:id/chapter/:chapterId', VerifyToken, Me, ChapterController.deleteByChapterId);

app.use(NotFound);                                          // Using the NotFound middleware
app.use(ErrorHandler);                                      // Using the ErrorHandler middleware


export default app;                                         // Exporting the Express application