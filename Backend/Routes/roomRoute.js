const express = require("express");
const {
  createRoom,
  readAllRooms,
  getRoom,
  search,
  getAllCompanyRooms,
} = require("../controllers/roomController");
const authenticate = require("../Middleware/verifyJWT");

const route = express.Router();

route.post("/create-room", authenticate, createRoom);
route.get("/get-all-rooms", readAllRooms);
route.get("/get-room/:roomId", authenticate, getRoom);
route.get("/search", authenticate, search);
route.get("/get_company_rooms/:companyID", authenticate, getAllCompanyRooms);

module.exports = route;
