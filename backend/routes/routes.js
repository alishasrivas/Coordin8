//set up all routes here

import express from "express";
import {
    register,
    login,
    logout,
    test,
    createEvent,
    updateUserProfile,
    getUserProfile,
    getUserEvents,
    getOrganizedEvents,
    getAcceptedEvents
} from "../controller/controller.js";
import { isAuthenticated, authenticatedJWT } from "../middleware/middleware.js";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", authenticatedJWT, logout); //A get method is sufficient for logout
router.get("/test", test);

//TODO: add protected routes here
//Sample: router.get("/api/endpoint", authenticatedJWT, <function that called when HTTP request is called to endpoint>)
//Example:
router.get("/protected", authenticatedJWT, (req, res) => {
    res.json({ message: "Protected route accessed successfully" });
});

// When an HTTP POST request is made to the /events endpoint with a valid JWT, the createEvent function will be called
router.post("/events", authenticatedJWT, createEvent);


//endpoints for profile settings features
router.patch('/userInfo/:id', authenticatedJWT, updateUserProfile);
router.get('/userInfo/:id', authenticatedJWT, getUserProfile);

// endpoint for getting all events that have true accepted value and same user_id as the token
router.get('/getUserEvents/:id', authenticatedJWT, getUserEvents);

router.get('/organizedEvents', authenticatedJWT, getOrganizedEvents);
router.get('/acceptedEvents', authenticatedJWT, getAcceptedEvents);

export default router;
