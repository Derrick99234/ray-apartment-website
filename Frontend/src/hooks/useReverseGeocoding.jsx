import { useState, useEffect } from "react";
import axios from "axios";

// Replace with your Geoapify API key
const GEOAPIFY_API_KEY = "86dd5eb3f5f44a0899e450a627f3d2e3";

const useReverseGeocoding = (lat, lon) => {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const getAddressFromCoordinates = async (lat, lon) => {
      try {
        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${GEOAPIFY_API_KEY}`
        );
        console.log(response.data);
        if (
          response.data &&
          response.data.features &&
          response.data.features.length > 0
        ) {
          const city = response.data.features[0].properties.city || "";
          const state = response.data.features[0].properties.state || "";
          const formatted =
            response.data.features[0].properties.formatted || "";
          return [`${city} ${state}`, formatted];
        }
      } catch (error) {
        console.error("Error fetching address data", error);
      }
      return "Unknown location";
    };

    if (lat && lon) {
      getAddressFromCoordinates(lat, lon).then((addr) => setAddress(addr));
    }
  }, [lat, lon]);

  return address;
};

export default useReverseGeocoding;
