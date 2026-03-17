import express, { json } from "express";
import dotenv from "dotenv";
import  connectDB  from "./config/db.js";
import User from "./models/user.js"
dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.post("/signup", async (req, res)=>{

  const user = new User({
    firstName:"Manish kumar",
    lastName:"Thakur",
    emailId:"mkthakur511@gmail.com",
    password:"test@123"
  });

  await user.save();

  res.status(201).json({message:"user registered"})

})


app.get("/health", (req, res) => {
  res.send("Server running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
