"use strict";
const mongoose = require("mongoose");
const TicketSchema = new mongoose.Schema({
    title: String,
    description: String,
    contactInformation: String,
    status: { type: String, default: "pending" },
}, { timestamps: true, versionKey: false });
module.exports = mongoose.model("Ticket", TicketSchema);
