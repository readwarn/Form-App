// server.js
import { details, categories } from "./routes/index.js";
import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(
  "mongodb+srv://reelee:physics522@cluster0.ltxb6.mongodb.net/oauth?retryWrites=true&w=majority"
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home is where the heart is");
});

app.use("/categories", categories);
app.use("/details", details);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
