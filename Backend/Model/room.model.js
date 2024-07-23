const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  location: { type: Array },
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
  description: { type: String },
  company: { type: Schema.Types.ObjectId, ref: "CompanyDetail" },
});

module.exports = mongoose.model("Room", roomSchema);
