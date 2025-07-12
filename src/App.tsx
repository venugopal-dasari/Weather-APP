import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import WeatherDashboard from "./components/WeatherDashboard";
import SearchBar from "./components/SearchBar";
import Navigation from "./components/Navigation";
import LocationPage from "./components/pages/LocationPage";
import WindPage from "./components/pages/WindPage";
import HumidityPage from "./components/pages/HumidityPage";
import TemperaturePage from "./components/pages/TemperaturePage";
import { WeatherData } from "./types/weather";
import { weatherApi } from "./services/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentCity, setCurrentCity] = useState("New York");
  const [activePage, setActivePage] = useState("overview");

  useEffect(() => {
    // Load initial weather data
    fetchWeatherData(currentCity);
  }, []);

  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await weatherApi.getCurrentWeather(city);
      setWeatherData(data);
      setCurrentCity(city);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      console.error("Weather fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySearch = (city: string) => {
    fetchWeatherData(city);
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const data = await weatherApi.getWeatherByCoords(
              position.coords.latitude,
              position.coords.longitude
            );
            setWeatherData(data);
            setCurrentCity("Current Location");
          } catch (err) {
            setError("Failed to get location weather. Please try again.");
          }
        },
        () => {
          setError(
            "Location access denied. Please search for a city manually."
          );
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-indigo-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "rgba(255, 255, 255, 0.9)",
            color: "#1f2937",
            backdropFilter: "blur(20px)",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          },
        }}
      />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white text-shadow mb-6">
            🌤️ Weather App
          </h1>
          <p className="text-white/90 text-xl md:text-2xl font-medium">
            Real-time weather information for cities worldwide
          </p>
        </motion.div>

        <SearchBar
          onSearch={handleCitySearch}
          onLocationClick={handleLocationClick}
          currentCity={currentCity}
        />

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center py-20"
            >
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-white text-lg">Loading weather data...</p>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-6 max-w-md mx-auto">
                <div className="text-red-400 text-4xl mb-4">⚠️</div>
                <h3 className="text-white font-semibold mb-2">Error</h3>
                <p className="text-white/80">{error}</p>
                <button
                  onClick={() => fetchWeatherData(currentCity)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          ) : weatherData ? (
            <motion.div
              key="weather"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {activePage === "overview" && (
                <WeatherDashboard
                  weatherData={weatherData}
                  onPageChange={setActivePage}
                />
              )}
              {activePage !== "overview" && (
                <>
                  <Navigation
                    activePage={activePage}
                    onPageChange={setActivePage}
                  />
                  {activePage === "location" && (
                    <LocationPage weatherData={weatherData} />
                  )}
                  {activePage === "wind" && (
                    <WindPage weatherData={weatherData} />
                  )}
                  {activePage === "humidity" && (
                    <HumidityPage weatherData={weatherData} />
                  )}
                  {activePage === "temperature" && (
                    <TemperaturePage weatherData={weatherData} />
                  )}
                </>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
