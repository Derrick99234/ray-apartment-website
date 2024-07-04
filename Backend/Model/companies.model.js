const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  location: { type: String },
  companyName: { type: String, require: true },
  tel: { type: String, require: true },
  email: { type: String, require: true },
  websiteURL: { type: String, require: true },
  description: { type: String, require: true },
  checkInTime: { type: String, require: true },
  checkOutTime: { type: String, require: true },
  cancellationPolicy: { type: String, require: true },
  childPolicy: { type: String, require: true },
  petPolicy: { type: String, require: true },
  hotelAmenities: { type: Array, require: true },
  hotelPictureURLs: { type: Array, require: true },
  nearByAttractions: { type: String, require: true },
  facebookURL: { type: String, require: true },
  twitterURL: { type: String, require: true },
  instaURL: { type: String, require: true },
});

module.exports = mongoose.model("CompanyDetail", companySchema);
