const express = require("express");
const {
  createRoom,
  readAllRooms,
  getRoom,
  search,
  getAllCompanyRooms,
  editRoomLocation,
  editRoomDetail,
  editHouseRule,
} = require("../controllers/roomController");
const authenticate = require("../Middleware/verifyJWT");

const route = express.Router();

route.post("/create-room", authenticate, createRoom);
route.get("/get-all-rooms", readAllRooms);
route.get("/get-room/:roomId", authenticate, getRoom);
route.get("/search", authenticate, search);
route.get("/get_company_rooms/:companyID", authenticate, getAllCompanyRooms);
route.patch("/update_room_location/:roomID", authenticate, editRoomLocation);
route.patch("/update_room_details/:roomID", authenticate, editRoomDetail);
route.patch("/update_house_rule/:roomID", authenticate, editHouseRule);

module.exports = route;
