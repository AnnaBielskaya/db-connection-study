import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import axios from "axios";

export default function AvailablePlaces({ onSelectPlace }) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/places/");
      setPlaces(response.data.places);
    };

    fetchData();
  }, []);

  return (
    <Places
      title="Available Places"
      places={places}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
