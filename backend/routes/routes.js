//set up all routes here
//TODO: add routes here

import express from "express";
import { register, login, logout } from "../controller/controller";
import { isAuthenticated } from "../middleware/middleware.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout); //A get method is sufficient for logout


//TODO: add protected routes here
//router.get("/api/endpoint", isAutheticated, <function that called when HTTP request is called to endpoint>)
// router.get("/api", isAuthenticated)
