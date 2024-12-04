import { factoryResponse } from "../src/factoryResponse.js";
import { EventInstance, UserInstance } from "../model/main.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
//!define main logic and functions for backend here
//load environemtn variables
dotenv.config({ path: "../.env" });
const existsUser = async (email) => {
  const user = await UserInstance.findOne({ where: { email } });
  return user;
};

//testing function
export const test = async (req, res) => {
  res.json(factoryResponse(200, "Hello?"));
};

// Registration route.
// This route creates a new user in the database.
export const register = async (req, res) => {
  try {
    const { email, password, username, primary_time_zone } = req.body;
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

// Login route.
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

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
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

export const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      res.json(factoryResponse(500, "Logout failed"));
      return;
    }
    res.json(factoryResponse(200, "Logout successful"));
  });
};

// Callback function for HTTP POST requests to /events endpoint
// Server stores event in database and responds with success message if request is successful
// Server responds with failure message if request is unsuccessful
export const createEvent = async (req, res) => {
  try {
    // Parse data from client
    const { name, description, invitees, date } = req.body;
    // Inserts a new event record into the database using Sequelize
    const event = await EventInstance.create({
      name,
      description,
      invitees,
      date,
    });
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Failed to create event" });
  }
};
