require("dotenv").config();


import express, { Request, Response, Router } from "express";
import axios from "axios";
import { IUser, User } from "../database/models/user";
import { generateToken } from "../utils/jwt";

const authFacebookrouter = express.Router();

const APP_ID = process.env.FACEBOOK_CLIENT_ID;
const APP_SECRET = process.env.FACEBOOK_CLIENT_SECRET;
const REDIRECT_URI = process.env.FACEBOOK_CLIENT_URL;

// Initiates the Facebook Login flow
authFacebookrouter.get("/auth/facebook", (req, res) => {
  const url = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}`;
  res.redirect(url);
});

// Callback URL for handling the Facebook Login response
authFacebookrouter.get("/user/facebook/callback", async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange authorization code for access token
    const { data } = await axios.get(
      `https://graph.facebook.com/v13.0/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`
    );

    const { access_token } = data;

    // Use access_token to fetch user profile
    const { data: profile } = await axios.get(
      `https://graph.facebook.com/v13.0/me?fields=name,email&access_token=${access_token}`
    );

    // Code to handle user authentication and retrieval using the profile data

    res.redirect("/");
  } catch (error: any) {
    console.error("Error:", error.response.data.error);
    res.redirect("/login");
  }
});

export default authFacebookrouter;