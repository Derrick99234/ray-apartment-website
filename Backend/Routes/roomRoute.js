const express = require("express");
const { createRoom, readAllRooms } = require("../controllers/roomController");
const authenticate = require("../Middleware/verifyJWT");

const route = express.Router();

route.post("/create-room", authenticate, createRoom);
route.get("/get-all-rooms", readAllRooms);

module.exports = route;
