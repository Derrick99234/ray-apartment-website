const Company = require("../Model/companies.model");

const createCompany = async (req, res) => {
  // Parse the form data
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: true, message: err });
    }

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
    if (!req.files)
      return res
        .status(404)
        .json("Please fill out the required information in step 5");

    // Extract file paths from multer upload
    const hotelPictures = req.files.map((file) => file.path);

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
  });
};

module.exports = { createCompany };
