import express, { json } from "express"
import dotenv from "dotenv"
import { adminAuth, userAuth } from "./middlewares/auth.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json())

app.use("/admin", adminAuth);

app.use("/user/login", (req, res)=>{
  res.send("You're are logged in");
})
app.get("/user/data", userAuth,(req, res)=>{
  res.send("User Data Sent");
})

app.get("/admin/getAllData", (req,res)=>{

  res.send("Get All Data");

});
 
app.get("/admin/deleteUser", (req,res)=>{
  res.send("Deleted a user");
});

app.get('/health', (req, res) => {
  res.send("Server running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

