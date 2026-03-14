import express, { json } from "express"
import dotenv from "dotenv"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())

app.get('/user', (req, res, next)=>{
  console.log("User 1")
  // res.send("Response 1");
  next();
}, (req, res)=>{
  console.log("User 2")
  res.send("Response 2")
  
})



app.get('/health', (req, res) => {
  res.send("Server running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

