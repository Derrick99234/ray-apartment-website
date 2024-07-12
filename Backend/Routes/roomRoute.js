const express = require("express");
const { createRoom } = require("../controllers/roomController");
const authenticate = require("../Middleware/verifyJWT");

const route = express.Router();

route.post("/create-room", authenticate, createRoom);

module.exports = route;
