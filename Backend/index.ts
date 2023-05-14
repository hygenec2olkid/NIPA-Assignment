import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();
app.use(cors());
const port = process.env.PORT;
const mongoose = require("mongoose");
const Ticket = require("./models/Ticket");
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://hygene:UaOLGJveN7Rzewm4@cluster0.dumiclz.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("success connect"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Hello from back-end! /ticket to see all tickets");
});

app.get("/ticket", async (req, res) => {
  const tickets = await Ticket.find({});
  res.json(tickets.sort());
});

app.post("/ticket", async (req, res) => {
  const payload = req.body;
  const ticket = new Ticket(payload);
  await ticket.save();
  res.status(201).json(ticket);
});

app.put("/ticket/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;

  const ticket = await Ticket.findByIdAndUpdate(id, { $set: payload });
  res.json(ticket);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

module.exports = app;
