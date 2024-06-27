const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String },
  displayName: { type: String, require: true },
  username: { type: String, require: true },
  password: { type: String, require: true },
  photoURL: {
    type: String,
    default:
      "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg",
  },
});

module.exports = mongoose.model("User", UserSchema);
