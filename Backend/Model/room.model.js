const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  location: { type: String },
  hotelOfThisType: { type: String },
  numberOfRoom: { type: String },
  roomName: { type: String },
  bedAvailable: { type: Array },
  numberOfGuest: { type: String },
  isSmokingAllowed: { type: Boolean },
  roomFacility: { type: Array },
  childrenAllowed: { type: String },
  petAllowed: { type: String },
  parking: { type: Array },
  breakfast: { type: Array },
  roomPictures: { type: Array },
  roomPricePerNight: { type: String },
  company: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Room", roomSchema);
