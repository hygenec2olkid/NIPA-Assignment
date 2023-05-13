// import express, { Express, Request, Response } from "express";
const express = require("express");
// import dotenv from "dotenv";
const dotenv = require("dotenv")
// import { Console } from "console";
// import cors from "cors";
const cors = require("cors")

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT;
const mongoose = require("mongoose");
const Ticket = require("./models/Ticket");
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://hygene:UaOLGJveN7Rzewm4@atlascluster.1ean1se.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("success connect"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("hello from backend");
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
