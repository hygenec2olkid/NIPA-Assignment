"use strict";
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Ticket = require("../models/Ticket");
router.get('/', (req, res, next) => {
    Ticket.find((err, tickets) => {
        if (err)
            return next(err);
        res.json(tickets);
    });
});
module.exports = router;
