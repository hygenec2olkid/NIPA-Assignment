"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = process.env.PORT;
const mongoose = require("mongoose");
const Ticket = require("./models/Ticket");
app.use(express_1.default.json());
mongoose
    .connect("mongodb+srv://hygene:UaOLGJveN7Rzewm4@cluster0.dumiclz.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => console.log("success connect"))
    .catch((err) => console.error(err));
app.get("/", (req, res) => {
    res.send("hello from backend");
});
app.get("/ticket", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tickets = yield Ticket.find({});
    res.json(tickets.sort());
}));
app.post("/ticket", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const ticket = new Ticket(payload);
    yield ticket.save();
    res.status(201).json(ticket);
}));
app.put("/ticket/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const { id } = req.params;
    const ticket = yield Ticket.findByIdAndUpdate(id, { $set: payload });
    res.json(ticket);
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
module.exports = app;
