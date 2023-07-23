const createError = require("http-errors");

const User = require("../../models/user.model");
const { ObjectId } = require("mongoose").Types;

const getUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findOne({ _id });
    if (!user) {
      return next(createError(404));
    }
    res.status(200).json({
      message: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while fetching user",
      error: err,
    });
  }
};

module.exports = getUser;
