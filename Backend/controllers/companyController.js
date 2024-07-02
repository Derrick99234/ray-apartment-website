const Company = require("../Model/companies.model");

const createCompany = async (req, res) => {
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
    hotelPictures,
    nearByAttractions,
    facebookURL,
    twitterURL,
    instaURL,
  } = req.body;

  if (!location)
    return res
      .status(404)
      .json(
        "To complete this process please fill out the required infomation in step1"
      );
  if (!companyName || !tel || !email || !websiteURL)
    return res
      .status(404)
      .json(
        "To complete this process please the required fill out infomation in step2"
      );
  if (!description)
    return res
      .status(404)
      .json(
        "To complete this process please the required fill out infomation in step3"
      );
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
      .json(
        "To complete this process please the required fill out infomation in step4"
      );
  if (!hotelPictures)
    return res
      .status(404)
      .json(
        "To complete this process please the required fill out infomation in step4"
      );

  try {
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
      hotelPictures,
      nearByAttractions,
      facebookURL,
      twitterURL,
      instaURL,
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

module.exports = { createCompany };
