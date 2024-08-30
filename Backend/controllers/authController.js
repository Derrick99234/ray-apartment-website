const User = require("../Model/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")
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

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ error: true, message: "account not exist" });
    const passwordMatch = await bcryptjs.compare(password, user.password);

    if (!passwordMatch)
      return res
        .status(400)
        .json({ error: true, message: "Password is incorrect" });

    const maxAge = 60 * 60 * 2;
    const token = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET_TOKEN, {
      expiresIn: maxAge,
    });

    return res
      .status(200)
      .json({ error: false, message: "Login successful", user, token });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "Something went wrong" });
  }
};

const forgottenPassword = async (req, res) => {
  console.log("Email:", process.env.EMAIL);
  console.log("Password:", process.env.PASSWORD);
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ error: true, message: "Account does not exist" });
    }

    // Create a transporter with direct SMTP settings
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const maxAge = 60 * 15;
    const token = jwt.sign(
      { id: user._id },
      process.env.ACCESS_SECRET_TOKEN,
      {
        expiresIn: maxAge,
      }
    );

    const resetUrl = `http://localhost:3000/reset_password/${token}`;

    const emailContent = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #007bff;">Password Reset Request</h2>
      <p>You requested a password reset. Please click the link below to reset your password:</p>
      <a 
        href="${resetUrl}" 
        style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">
        Reset Password
      </a>
      <p>If you did not request this, please ignore this email.</p>
    </div>
  `;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Forgotten Password",
      text: "You requested a password reset.",
      html: emailContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return res.status(200).json({
      error: false,
      message: "Message sent",
      info: info.messageId,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      error: true,
      message: "Something went wrong",
      err: error,
    });
  }
};

module.exports = { register, login };
