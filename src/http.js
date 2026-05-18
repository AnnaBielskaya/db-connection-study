import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const fetchPlaces = async () => {
  const response = await axios.get(`${BASE_URL}/places/`);

  console.log("Response from server:", response);
  if (!response.status || response.status !== 200) {
    throw new Error("Failed to fetch places.");
  }

  return response.data.places;
};
