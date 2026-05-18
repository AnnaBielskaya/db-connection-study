import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchPlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const fetchedPlaces = await fetchPlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const sortedPlaces = sortPlacesByDistance(
            fetchedPlaces,
            latitude,
            longitude,
          );
          setPlaces(sortedPlaces);
        });

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
