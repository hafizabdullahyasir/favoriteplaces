
import PlacesList from "../components/Places/PlacesList";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

export default function AllPlaces() {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      try {
        const places = await fetchPlaces();
        console.log('Loaded places:', places); // Debug log
        setLoadedPlaces(places || []); // Ensure it's always an array
      } catch (error) {
        console.log('Error loading places:', error);
        setLoadedPlaces([]); // Set empty array on error
      }
    }

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />
}