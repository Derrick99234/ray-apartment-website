const User = require("../Model/user.model");

const getUser = async (req, res) => {
  const { id } = req.id;

  try {
    const user = await User.findOne({ _id: id });

    const { password, ...rest } = user._doc;

    res.status(200).json({
      error: false,
      user: rest,
      message: "User details retrieved successfully",
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      e,
      message: "Internal server error",
    });
  }
};

module.exports = { getUser };
