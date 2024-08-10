const Room = require("../Model/room.model");
const Company = require("../Model/companies.model");
const User = require("../Model/user.model");

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
    description,
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
  if (!description)
    return res.status(404).json({
      error: true,
      message: "Please fill out the required information in step 7",
    });
  if (!roomPricePerNight)
    return res.status(404).json({
      error: true,
      message: "Please fill out the required information in step 8",
    });

  try {
    const { id } = req.id;
    const userDoc = await User.findOne({ _id: id });
    if (!userDoc) {
      return res.status(400).json({
        error: true,
        message: "User not found",
      });
    }
    const companyDoc = await Company.findOne({ companyId: userDoc.email });

    if (!companyDoc) {
      return res.status(400).json({
        error: true,
        message: "Company not found",
      });
    }

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
      description,
      company: companyDoc._id,
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

const readAllRooms = async (req, res) => {
  try {
    const room = await Room.find().populate("company");
    return res.status(200).json({
      error: false,
      room,
      message: "Room data retrieved successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      err,
      message: "an error occured while trying to retrieve company data",
    });
  }
};

const getRoom = async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Room.findOne({ _id: roomId }).populate("company");
    return res.status(200).json({
      error: false,
      room,
      message: "Room data retrieved successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      err,
      message: "an error occured while trying to retrieve room data",
    });
  }
};
const GEOAPIFY_API_KEY = "86dd5eb3f5f44a0899e450a627f3d2e3";

const getAddressFromCoordinates = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${GEOAPIFY_API_KEY}`
    );
    const data = await response.json();
    if (data && data.features && data.features.length > 0) {
      const properties = data.features[0].properties;
      const formatted = properties.formatted || "";
      const city = properties.city || "";
      const state = properties.state || "";
      const country = properties.country || "";
      return { formatted, city, state, country };
    }
  } catch (error) {
    console.error("Error fetching address data", error);
  }
  return { formatted: "Unknown location", city: "", state: "", country: "" };
};
``;
// Mapping of known aliases
const aliases = {
  "Federal Capital Territory": "Abuja",
};

const search = async (req, res) => {
  const { query } = req.query;
  console.log(query);
  try {
    const rooms = await Room.find();
    const searchResults = [];

    for (const room of rooms) {
      const [lat, lon] = room.location;
      const addressComponents = await getAddressFromCoordinates(lat, lon);

      const { formatted, city, state, country } = addressComponents;

      const searchStrings = [
        formatted,
        city,
        state,
        country,
        aliases[state] || "", // Check aliases
        aliases[city] || "", // Check aliases
      ].map((str) => str.toLowerCase());

      if (
        searchStrings.some((str) => str.includes(query.toLowerCase())) ||
        room.hotelOfThisType.toLowerCase().includes(query.toLowerCase()) ||
        room.roomName.toLowerCase().includes(query.toLowerCase()) ||
        room.description.toLowerCase().includes(query.toLowerCase())
      ) {
        searchResults.push(room);
      }
    }

    res.json(searchResults);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while searching for rooms." });
  }
};

const getAllCompanyRooms = async (req, res) => {
  try {
    const { companyID } = req.params;
    const rooms = await Room.find({ company: companyID });
    res.status(200).json({
      error: true,
      rooms,
      message: "company rooms retrieved successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      err,
      message: "an error occured while trying to retrieve room data",
    });
  }
};

const editRoomLocation = async (req, res) => {
  const roomID = req.params.roomID;
  const { location } = req.body;

  try {
    const room = await Room.findOne({ _id: roomID });

    if (!location)
      return res.status(404).json({
        error: true,
        message: "No changes was made",
      });

    if (location) room.location = location;
    await room.save();

    res.status(200).json({
      error: false,
      room,
      message: "Room data updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      err,
      message: "an error occured while trying to retrieve room data",
    });
  }
};

const editRoomDetail = async (req, res) => {
  const {
    roomName,
    numberOfRoom,
    bedAvailable,
    numberOfGuest,
    isSmokingAllowed,
  } = req.body;

  const { roomID } = req.params;
  try {
    const room = await Room.findOne({ _id: roomID });

    if (
      !roomName &&
      !numberOfRoom &&
      !bedAvailable &&
      !isSmokingAllowed &&
      !numberOfGuest
    ) {
      return res.status(404).json({
        error: true,
        message: "No changes was made",
      });
    }

    if (roomName) room.roomName = roomName;
    if (numberOfRoom) room.numberOfRoom = numberOfRoom;
    if (bedAvailable) room.bedAvailable = bedAvailable;
    if (isSmokingAllowed) room.isSmokingAllowed = isSmokingAllowed;
    if (numberOfGuest) room.numberOfGuest = numberOfGuest;
    await room.save();

    res.status(200).json({
      error: false,
      room,
      message: "room details updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      err,
      message: "Internal server error",
    });
  }
};

const editHouseRule = async (req, res) => {
  const { roomID } = req.params;
  const { childrenAllowed, petAllowed, parking, breakfast, description } =
    req.body;

  try {
    const room = await Room.findOne({ _id: roomID });

    if (!room) {
      return res.status(404).json({
        error: true,
        message: "room not found",
      });
    }

    if (childrenAllowed) room.childrenAllowed = childrenAllowed;
    if (petAllowed) room.petAllowed = petAllowed;
    if (parking) room.parking = parking;
    if (breakfast) room.breakfast = breakfast;
    if (description) room.description = description;

    await room.save();

    return res.status(200).json({
      error: false,
      room,
      message: "House rule and description updatd successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      err,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createRoom,
  readAllRooms,
  getRoom,
  search,
  getAllCompanyRooms,
  editRoomLocation,
  editRoomDetail,
  editHouseRule,
};
