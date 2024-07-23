const Company = require("../Model/companies.model");

const createCompany = async (req, res) => {
  // Parse the form data

  const {
    location,
    companyName,
    tel,
    email,
    websiteURL,
    description,
    checkInTime,
    checkOutTime,
    cancellationPolicy,
    childPolicy,
    petPolicy,
    hotelAmenities,
    hotelPictureURLs,
    nearByAttractions,
    facebookURL,
    twitterURL,
    instaURL,
  } = req.body;

  // Validate required fields
  if (!location)
    return res
      .status(404)
      .json("Please fill out the required information in step 1");
  if (!companyName || !tel || !email || !websiteURL)
    return res
      .status(404)
      .json("Please fill out the required information in step 2");
  if (!description)
    return res
      .status(404)
      .json("Please fill out the required information in step 3");
  if (
    !checkInTime ||
    !checkOutTime ||
    !cancellationPolicy ||
    !childPolicy ||
    !petPolicy ||
    !hotelAmenities
  )
    return res
      .status(404)
      .json("Please fill out the required information in step 4");
  if (!hotelPictureURLs)
    return res
      .status(404)
      .json("Please fill out the required information in step 5");

  try {
    const { id } = req.id;
    const userDoc = await User.findOne({ _id: id });
    if (!userDoc) {
      return res.status(400).json({
        error: true,
        message: "User not found",
      });
    }
    const company = await Company.create({
      location,
      companyName,
      tel,
      email,
      websiteURL,
      description,
      checkInTime,
      checkOutTime,
      cancellationPolicy,
      childPolicy,
      petPolicy,
      hotelAmenities,
      hotelPictureURLs,
      nearByAttractions,
      facebookURL,
      twitterURL,
      instaURL,
      companyId: userDoc.email,
    });

    res.status(200).json({
      error: false,
      company,
      message:
        "Your Dashboard is ready, start by creating the post of your rooms",
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      error: e,
      message: "Internal Server Error",
    });
  }
};

const getCompany = async (req, res) => {
  const email = req.params.email;

  try {
    const company = await Company.findOne({ companyId: email });

    if (!company)
      return res
        .status(400)
        .json({ error: true, message: "company not found" });

    return res.status(200).json({
      error: false,
      company,
      message: "Company data retrieved successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      err,
      message: "an error occured while trying to retrieve company data",
    });
  }
};

const updateCompany = async (req, res) => {
  const {
    location,
    companyName,
    tel,
    email,
    websiteURL,
    description,
    checkInTime,
    checkOutTime,
    cancellationPolicy,
    childPolicy,
    petPolicy,
    hotelAmenities,
    hotelPictureURLs,
    nearByAttractions,
    facebookURL,
    twitterURL,
    instaURL,
  } = req.body;

  try {
    const companyId = req.params.email;
    const company = await Company.findOne({ companyId });

    if (!company) {
      return res.status(400).json({
        error: true,
        message: "company not found",
      });
    }
    if (location) company.location = location;
    if (companyName) company.companyName = companyName;
    if (tel) company.tel = tel;
    if (email) company.email = email;
    if (websiteURL) company.websiteURL = websiteURL;
    if (description) company.description = description;
    if (checkInTime) company.checkInTime = checkInTime;
    if (checkOutTime) company.checkOutTime = checkOutTime;
    if (cancellationPolicy) company.cancellationPolicy = cancellationPolicy;
    if (childPolicy) company.childPolicy = childPolicy;
    if (petPolicy) company.petPolicy = petPolicy;
    if (hotelAmenities) company.hotelAmenities = hotelAmenities;
    if (hotelPictureURLs) company.hotelPictureURLs = hotelPictureURLs;
    if (facebookURL) company.facebookURL = facebookURL;
    if (twitterURL) company.twitterURL = twitterURL;
    if (instaURL) company.instaURL = instaURL;
    if (nearByAttractions) company.nearByAttractions = nearByAttractions;

    await company.save();
    res.json({
      error: false,
      company,
      message: "Company updated successfully",
    });
  } catch (e) {
    res.status(500).json({
      error: true,
      message: "Internal server Error",
    });
  }
};

module.exports = { createCompany, getCompany, updateCompany };
