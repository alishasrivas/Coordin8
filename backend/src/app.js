import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import routes from "../routes/routes.js";
import cors from "cors";
//Initialize the express app

const app = express();

//configure express app
app.use(express.json());
app.use(cors()); //set up cors in case we need to run front-end and backend seperately
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
app.use("/", routes);

//run the server
app.listen(3000, () => { console.log("Server is running on port 3000") });

export default app;






