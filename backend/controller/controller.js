import { factoryResponse } from "../src/factoryResponse.js";
import {
  EventInstance,
  EventParticipantInstance,
  UserInstance,
} from "../model/main.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
//!define main logic and functions for backend here
//load environment variables
dotenv.config({ path: "../.env" });
const existsUser = async (email) => {
  const user = await UserInstance.findOne({ where: { email } });
  return user;
};

//testing function
export const test = async (req, res) => {
  res.json(factoryResponse(200, "Hello?"));
};

// Registration callback
// This route creates a new user in the database.
export const register = async (req, res) => {
  try {
    const {
      email,
      password,
      username,
      primary_time_zone,
      notificationPreferences,
    } = req.body;
    // Check if the email is already taken
    if (await existsUser(email))
      return res
        .status(400)
        .json(
          factoryResponse(400, "Your email is linked to an existing account")
        );
    const hash = await bcrypt.hash(password, 10);
    await UserInstance.create({
      email,
      password: hash,
      username,
      primary_time_zone,
      notificationPreferences,
    });
    res.json(factoryResponse(200, "Registration successful"));
    console.log("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json(factoryResponse(500, "Internal Server Error at resgister"));
  }
};

// Login callback
// This route checks the user's credentials and logs them in.
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserInstance.findOne({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json(
          factoryResponse(401, "User had not existed, please register first")
        );
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json(factoryResponse(401, "Invalid credentials"));
    }
    //everything is ok now proceeds to include tokens for response
    process.env["JWT_SECRET_KEY"] = randomBytes(16).toString("hex");
    // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });
    const token = jwt.sign(
      { user_id: user.user_id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      status: 200,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res
      .status(500)
      .json(factoryResponse(500, "Internal Server Error at login"));
  }
};
//logout callback
export const logout = (req, res) => {
  //this will attempt to destroy session and invalidate the token, on the front end we will also remove the token from cookie to make sure
  try {
    console.log(`Log Out route: current user id ${req.user.user_id}`);
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json(factoryResponse(500, "Logout failed"));
      }
      res.clearCookie("connect.sid");
      process.env.JWT_SECRET_KEY = ""; //invalidate the token by deleting the secret key associated with it
      res.json(factoryResponse(200, "Logout successful"));
    });
  } catch (error) {
    console.error("Error logging out user:", error);
    res
      .status(500)
      .json(factoryResponse(500, "Internal Server Error at logout"));
  }
};

// Callback function for HTTP POST requests to /events endpoint
// Server stores event in database and responds with success message if request is successful
// Server responds with failure message if request is unsuccessful
export const createEvent = async (req, res) => {
  try {
    // Parse data from client
    const { title, description, invitees, event_time } = req.body;

    // Creates a new event and inserts record into the database using Sequelize
    const event = await EventInstance.create({
      title,
      description,
      event_time,
      organizer_id: req.user.user_id,
      invitees,
    });

    // Handle invitees if provided and create EventParticipantInstances
    if (Array.isArray(invitees) && invitees.length > 0) {
      // Want to find user IDs for invitees
      // Use Sequelize to query the UserInstance table and retrieve all records where the email column matches any of the emails provided in the invitees array.
      // Will create an array of UserInstance records representing each invitee
      const invitedUsers = await UserInstance.findAll({
        where: {
          email: invitees,
        },
      });

      // Extract user_id from each invitee
      const foundUserIds = invitedUsers.map((invitee) => invitee.user_id);
      // Extract email from each invitee
      const foundEmails = invitedUsers.map((invitee) => invitee.email);

      // Identifies and creates and array of missing emails
      const missingEmails = invitees.filter(
        (email) => !foundEmails.includes(email)
      );
      if (missingEmails.length > 0) {
        // Inform users that some emails are not linked to registered users
        return res.status(400).json({
          message:
            "Some invitees are not registered users. Failed to create event",
          missingEmails,
        });
      }

      let failedParticipants = [];
      // Create EventParticipantInstance for each invitee
      for (const userId of foundUserIds) {
        try {
          await createEventParticipant(event.event_id, userId);
        } catch (error) {
          console.error(
            `Failed to create EventParticipant for user ${userId}:`,
            error
          );
          // Maintain an array of all failed event participant creations
          failedParticipants.push(userId);
        }
      }

      if (failedParticipants.length > 0) {
        // Response upon successful event creation with failed event participant creations
        return res.status(201).json({
          message:
            "Event created with some EventParticipant creation failures.",
          event,
          failedParticipants,
        });
      }
    }

    // Response upon successful event creation with no event participant creation issues
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Failed to create event" });
  }
};

//Deletes an EventInstance
export const deleteEventInstance = async (req, res) => {
  try {
    const { idofevent } = req.params;
    const numdeleted = await EventInstance.destroy({
      where: { event_id: idofevent },
    });
    if (numdeleted === 0) {
      return res.status(404).json({ message: "Event deleted successfully" });
    }
    return res.status(404).json({ message: "Failed to delete event" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return res
      .status(500)
      .json({ message: "Sever error: Failed to delete EventInstance" });
  }
};

// Creates a new EventParticipantInstance based on the user_id and event_id
export const createEventParticipant = async (event_id, user_id) => {
  try {
    // Inserts a new EventParticipantInstance record into the database using Sequelize
    const eventParticipant = await EventParticipantInstance.create({
      event_id,
      user_id,
      status: null, // status should be initialized to null, because the event participant hasn't accepted or rejected the invitation yet
    });
    return eventParticipant;
  } catch (error) {
    console.error("Error creating event participant:", error);
    throw error; // createEvent function will handle the error
  }
};

//callback functions for profile settings feature

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id; //access dynamic parameter
    const {
      username,
      email,
      primary_time_zone,
      secondary_time_zone,
      notificationPreferences,
    } = req.body;
    console.log("Loaded variable");
    await UserInstance.update(
      {
        username,
        email,
        primary_time_zone,
        secondary_time_zone,
        notificationPreferences,
      },
      {
        where: { user_id: userId },
      }
    );
  } catch (error) {
    console.error("Error updating user profile:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error at updateUserProfile" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const userProfile = await UserInstance.findOne({
      where: { user_id: userId },
    });

    const {
      username,
      email,
      primary_time_zone,
      secondary_time_zone,
      notificationPreferences,
    } = userProfile.dataValues;

    res.status(200).json({
      username,
      email,
      primary_time_zone,
      secondary_time_zone,
      notificationPreferences,
    });
  } catch (error) {
    console.error("Error getting user profile:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error at getUserProfile" });
  }
};
