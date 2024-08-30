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
  editOtherRoomDetails,
  deleteRoomImage,
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
route.patch(
  "/update_other_room_details/:roomID",
  authenticate,
  editOtherRoomDetails
);
route.patch(
  "/update_other_room_data/:roomID",
  authenticate,
  editOtherRoomDetails
);
route.delete("/delete_room_image/:roomID", authenticate, deleteRoomImage);

module.exports = route;
