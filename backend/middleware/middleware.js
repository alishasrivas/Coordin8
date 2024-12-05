import { factoryResponse } from "../src/factoryResponse.js";
import dotenv from "dotenv";
dotenv.config({ path: '../.env' });
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const isAuthenticated = (req, res, next) => {
    return req.isAuthenticated()
        ? next() //move to next middleware
        : res.status(401).json(factoryResponse(401, "Unauthorized"));
};

export const authorizeRole = (role) => (req, res, next) => {
    return req.user.role === role
        ? next()
        : res.status(403).json(factoryResponse(403, "Forbidden"));
};

export const authenticatedJWT = (req, res, next) => {
    const authHeader = req.headers['authorization']; //Bearer token
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        //     if (err) {
        //         return res.status(403).json(factoryResponse(403, "Invalid credentials"));
        //     }
        //     req.user = user;
        //     next();
        // });

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json(factoryResponse(403, "Invalid credentials"));
            }
            req.user = user;
            next();
        });

    }
    else {
        return res.status(401).json(factoryResponse(401, "Unauthorized"));
    }
}
