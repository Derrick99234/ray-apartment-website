const Room = require("../Model/room.model");

const createRoom = async (req, res) => {
  const {
    location,
    hotelOfThisType,
    numberOfRoom,
    roomName,
    bedAvailable,
    numberOfGuest,
    isSmokingAllowed,
    roomFacility,
    childrenAllowed,
    petAllowed,
    parking,
    breakfast,
    roomPictures,
    roomPricePerNight,
  } = req.body;

  if (!location)
    return res.status(404).json({
      error: true,
      message: "Step2 information is required for complete registeration",
    });

  if (!numberOfRoom || !roomName || !bedAvailable || !numberOfGuest)
    return res.status(404).json({
      error: true,
      message: "Please fill out the required information in step 3",
    });

  if (!hotelOfThisType)
    return res.status(404).json({
      error: true,
      message: "Please fill out the required information in step 1",
    });

  if (!roomFacility)
    return res.status(404).json({
      error: true,
      message: "Please fill out the required information in step 4",
    });

  if (!childrenAllowed || !petAllowed || !parking || !breakfast)
    return res.status(404).json({
      error: true,
      message: "Please fill out the required information in step 5",
    });
  if (!roomPictures)
    return res.status(404).json({
      error: true,
      message: "Please fill out the required information in step 6",
    });
  if (!roomPricePerNight)
    return res.status(404).json({
      error: true,
      message: "Please fill out the required information in step 7",
    });

  try {
    const room = await Room.create({
      location,
      hotelOfThisType,
      numberOfRoom,
      roomName,
      bedAvailable,
      numberOfGuest,
      isSmokingAllowed,
      roomFacility,
      childrenAllowed,
      petAllowed,
      parking,
      breakfast,
      roomPictures,
      roomPricePerNight,
    });
    res.status(200).json({
      error: false,
      room,
      message: "Successfully posted a room",
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      error: e,
      message: "Internal Server Error",
    });
  }
};

module.exports = { createRoom };
