import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import router from "../routes/routes.js";
import cors from "cors";
//Initialize the express app

const app = express();
dotenv.config({ path: '../.env' });

//configure express app
app.use(express.json());
app.use(cors({
    origin: 'http://127.0.0.1:8080',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

//configure session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

//include routes
app.use("/", router);

//run the server
app.listen(3000, () => { console.log("Server is live on http://localhost:3000") });

export default app;






