import express, { json } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/user.js";
dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    const existingUser = await User.find({ emailId });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      firstName,
      lastName,
      emailId,
      password,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
      },
    });

  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.emailId;
    const user = await User.find({ emailId: userEmail });

    if (!user ) {
      res.status(404).json({ message: "User not found" })
    }
    res.send(user);
  } catch (error) {
    res.status.json({ message: "Something went wrong!" });
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);

  } catch (error) {
    res.status.json({ message: "Something went wrong!" });
  }
});



app.get("/health", (req, res) => {
  res.send("Server running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
