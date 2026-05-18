import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import axios from "axios";
import ErrorMessage from "./ErrorMessage.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get("http://localhost:300/places/");

        if (response.ok) {
          setErrorMessage("Failed to fetch places.");
          console.error("Failed to fetch places:");
        }

        setPlaces(response.data.places);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch places:", error);
        setErrorMessage("Failed to fetch places.", error);
        setIsLoading(false);
        return;
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {errorMessage && (
        <ErrorMessage
          title="Error"
          message={errorMessage}
          onConfirm={() => setErrorMessage(null)}
        />
      )}
      {!errorMessage && (
        <Places
          title="Available Places"
          places={places}
          isLoading={isLoading}
          fallbackText="No places available."
          onSelectPlace={onSelectPlace}
        />
      )}
    </>
  );
}
