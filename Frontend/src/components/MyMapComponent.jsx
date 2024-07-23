/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

// Replace with your Geoapify API key
const GEOAPIFY_API_KEY = "86dd5eb3f5f44a0899e450a627f3d2e3";

const locationIcon = new L.DivIcon({
  html: `<svg
    width="44"
    height="44"
    viewBox="0 0 24 24"
    fill="red"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 4.5 5 11 7 11s7-6.5 7-11c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z"/>
  </svg>`,
  className: "",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

const MyMapComponent = ({ location, onPinLocation }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const geocodeLocation = async () => {
      if (location) {
        try {
          const response = await axios.get(
            `https://api.geoapify.com/v1/geocode/search?text=${location}&apiKey=${GEOAPIFY_API_KEY}`
          );
          console.log("Geoapify response:", response.data); // Log the entire response
          if (
            response.data &&
            response.data.features &&
            response.data.features.length > 0
          ) {
            const [lon, lat] = response.data.features[0].geometry.coordinates;
            setPosition([parseFloat(lat), parseFloat(lon)]);
          } else {
            console.error("No results found in the response.");
          }
        } catch (error) {
          console.error("Error fetching the geocoding data", error);
        }
      }
    };

    geocodeLocation();
  }, [location]);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const newPosition = [e.latlng.lat, e.latlng.lng];
        setPosition(newPosition);
        if (onPinLocation) {
          onPinLocation(newPosition); // Call the callback function with the new position
        }
      },
    });
    return position === null ? null : (
      <Marker position={position} icon={locationIcon}></Marker>
    );
  };

  const MapViewUpdater = () => {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.setView(position, 15); // Adjust zoom level here
      }
    }, [position, map]);

    return null;
  };

  return (
    <MapContainer
      center={position || [6.5244, 3.3792]} // Default center
      zoom={position ? 13 : 4} // Zoom level
      style={{ height: "60vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <MapClickHandler />
      <MapViewUpdater />
      {position && <Marker position={position} icon={locationIcon}></Marker>}
    </MapContainer>
  );
};

export default MyMapComponent;
