/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

import data from "../../../data/cities.json";

const CitiesContext = createContext();

// const BASE_URL = data;

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [currentCity, setCurrentCity] = useState({});
  // const [isLoading, setIsLoading] = useState(false);

  const [{ cities, error, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const countries =
    [
      ...new Map(
        cities.map((item) => [item.country, { emoji: item.emoji, id: item.id }])
      ).entries(),
    ].map(([country, { emoji, id }]) => ({ country, emoji, id })) || [];

  // useEffect(function () {
  //   async function fetchCities() {
  //     dispatch({ type: "loading" });
  //     try {
  //       const response = await fetch(BASE_URL);
  //       const data = await response.json();
  //       dispatch({ type: "cities/loaded", payload: data });
  //     } catch (error) {
  //       dispatch({ type: "rejected", payload: error.message });
  //       console.error("Error fetching cities", error);
  //     }
  //   }

  //   fetchCities();
  // }, []);

  useEffect(function () {
    dispatch({ type: "loading" });
    try {
      // Since we're using local data, we can directly use the imported `data`
      dispatch({ type: "cities/loaded", payload: data.cities });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      console.error("Error loading cities", error);
    }
  }, []);

  // const getCity = useCallback(
  //   async function getCity(id) {
  //     if (Number(id) === currentCity.id) return;
  //     dispatch({ type: "loading" });
  //     try {
  //       const response = await fetch(`${BASE_URL}/${id}`);
  //       const data = await response.json();
  //       dispatch({ type: "city/loaded", payload: data });
  //     } catch (error) {
  //       dispatch({ type: "rejected", payload: error.message });
  //       console.error("Error fetching cities", error);
  //     }
  //   },
  //   [currentCity.id]
  // );

  // async function createCity(newCity) {
  //   dispatch({ type: "loading" });
  //   try {
  //     const response = await fetch(`${BASE_URL}`, {
  //       method: "POST",
  //       body: JSON.stringify(newCity),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await response.json();
  //     dispatch({ type: "city/created", payload: data });
  //   } catch (error) {
  //     dispatch({ type: "rejected", payload: error.message });
  //     console.error("Error fetching cities", error);
  //   }
  // }
  // async function deleteCity(id) {
  //   dispatch({ type: "loading" });
  //   try {
  //     const response = await fetch(`${BASE_URL}/${id}`, {
  //       // Tambahkan id ke URL
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to delete the city");
  //     }

  //     dispatch({ type: "city/deleted", payload: id });
  //   } catch (error) {
  //     dispatch({ type: "rejected", payload: error.message });
  //     console.error("Error deleting city", error);
  //   }
  // }

  const getCity = useCallback(
    function getCity(id) {
      if (id === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const city = cities.find((city) => city.id === id); // Find the city by id
        if (!city) {
          throw new Error("City not found");
        }
        dispatch({ type: "city/loaded", payload: city });
      } catch (error) {
        dispatch({ type: "rejected", payload: error.message });
        console.error("Error fetching city", error);
      }
    },
    [currentCity.id, cities]
  );

  function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      dispatch({ type: "city/created", payload: newCity });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      console.error("Error creating city", error);
    }
  }

  function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      console.error("Error deleting city", error);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        countries,
        isLoading,
        error,
        getCity,
        currentCity,
        createCity,
        deleteCity,
      }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Context is undefined for cities context");
  return context;
}

export { CitiesProvider, useCities };
