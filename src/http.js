import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const fetchPlaces = async () => {
  const { data, status } = await axios.get(`${BASE_URL}/places/`);

  if (!status || status !== 200) {
    throw new Error("Failed to fetch places.");
  }

  return data.places;
};

export const fetchUserPlaces = async () => {
  const { data, status } = await axios.get(`${BASE_URL}/user-places`);

  if (!status || status !== 200) {
    throw new Error("Failed to fetch user places.");
  }

  return data.places;
};

export const updateUserPlaces = async (places) => {
  const { data, status } = await axios.put(`${BASE_URL}/user-places/`, {
    places: places,
  });

  if (!status || status !== 200) {
    throw new Error("Failed to update user places.");
  }

  return data;
};
