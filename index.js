const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const tournamentRoutes = require("./Router/tournament");
const participantRoutes = require("./Router/participants");

const app = express();
dotenv.config();
app.use(express.json());

app.use(cors());

app.use("/api", tournamentRoutes);
app.use("/api", participantRoutes);

//Database Connection
async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Database error", error.message);
  }
}
main();
const PORT = 6000;
app.listen(PORT, () => console.log("Server started successfully"));
