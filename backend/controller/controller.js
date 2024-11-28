import { factoryResponse } from "../src/factoryResponse.js";
import { UserInstance } from "../model/main.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
//!define main logic and functions for backend here

//load environemtn variables
dotenv.config();
const existsUser = async (email) => {
    const user = await UserInstance.findOne({ where: { email } });
    return user;
};

// Registration route.
// This route creates a new user in the database.
export const register = async (req, res) => {
    const { email, password } = req.body;
    // Check if the username is already taken
    if (await existsUser(email))
        return res.status(400).json(factoryResponse(400, "Your email is linked to an existing account"));
    const hash = await bcrypt.hash(password, 10);
    await UserInstance.create({ email, password: hash });
    res.json(factoryResponse(200, "Registration successful"));
    console.log("User registered successfully");
};

// Login route.
// This route checks the user's credentials and logs them in.
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await UserInstance.findOne({ where: { email } });
    if (!user) {
        return res.status(401).json(factoryResponse(401, "User had not existed, please register first"));
    }
    if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).json(factoryResponse(401, "Invalid credentials"));
    }

    //everything is ok now proceeds to include tokens for response
    req.login(user, (err) =>
        err ? next(err) : res.json(factoryResponse(200, "Login successful"))
    );
};

// Logout route.
// This route logs the user out.
// The req.logout() function is provided by Passport. It removes the user's
// session and logs them out.
export const logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            res.json(factoryResponse(500, "Logout failed"));
            return;
        }
        res.json(factoryResponse(200, "Logout successful"));
    });
};