import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import axios from "axios";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/places/");
      setPlaces(response.data.places);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Places
      title="Available Places"
      places={places}
      isLoading={isLoading}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
