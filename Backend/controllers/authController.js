const User = require("../Model/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  const { username, email, password, displayName } = req.body;

  if (!username) {
    res.status(404).json({
      error: true,
      message: "Username is required for complete registeration",
    });
  }
  if (!email) {
    res.status(404).json({
      error: true,
      message: "Username is required for conplete registeration",
    });
  }
  if (!displayName) {
    res.status(404).json({
      error: true,
      message: "Name is required for conplete registeration",
    });
  }
  if (!password) {
    res.status(404).json({
      error: true,
      message: "Password is required for conplete registeration",
    });
  }

  try {
    const hashPassword = bcryptjs.hashSync(password, 10);
    const user = await User.create({
      email,
      displayName,
      username,
      password: hashPassword,
    });

    res.status(200).json({
      error: false,
      user,
      message: "Registeration successfully",
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ error: "Email does not exist" });

  const passwordMatch = await bcryptjs.compare(password, user.password);

  if (!passwordMatch)
    return res.status(400).json({ error: "Password is incorrect" });

  const maxAge = 60 * 60 * 24 * 3;

  const token = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET_TOKEN, {
    expiresIn: maxAge,
  });

  return res
    .status(200)
    .json({ error: false, message: "Login successful", user, token });
};

module.exports = { register, login };
