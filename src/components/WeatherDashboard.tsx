import React from "react";
import { motion } from "framer-motion";
import { WeatherData } from "../types/weather";
import WeatherCard from "./WeatherCard";
import WeatherMetrics from "./WeatherMetrics";
import WeatherDetails from "./WeatherDetails";

interface WeatherDashboardProps {
  weatherData: WeatherData;
  onPageChange: (page: string) => void;
}

const WeatherDashboard: React.FC<WeatherDashboardProps> = ({
  weatherData,
  onPageChange,
}) => {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange("location")}
          className="weather-card p-4 text-center hover:bg-white/30 transition-colors"
        >
          <div className="text-2xl mb-2">📍</div>
          <h3 className="font-semibold text-white">Location Details</h3>
          <p className="text-sm text-white/80">City & Region Info</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange("wind")}
          className="weather-card p-4 text-center hover:bg-white/30 transition-colors"
        >
          <div className="text-2xl mb-2">💨</div>
          <h3 className="font-semibold text-white">Wind & Atmospheric</h3>
          <p className="text-sm text-white/80">Wind Speed & Direction</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange("humidity")}
          className="weather-card p-4 text-center hover:bg-white/30 transition-colors"
        >
          <div className="text-2xl mb-2">💧</div>
          <h3 className="font-semibold text-white">Humidity & Precipitation</h3>
          <p className="text-sm text-white/80">Moisture & Rain Data</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange("temperature")}
          className="weather-card p-4 text-center hover:bg-white/30 transition-colors"
        >
          <div className="text-2xl mb-2">🌡️</div>
          <h3 className="font-semibold text-white">Temperature & Visibility</h3>
          <p className="text-sm text-white/80">Temp & Visibility Info</p>
        </motion.button>
      </motion.div>

      {/* Main Weather Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <WeatherCard weatherData={weatherData} />
      </motion.div>

      {/* Location and Time Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="weather-card p-6 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {weatherData.location.name}
        </h2>
        <p className="text-gray-600 mb-1">
          {weatherData.location.region && `${weatherData.location.region}, `}
          {weatherData.location.country}
        </p>
        <p className="text-sm text-gray-500">
          {formatDate(weatherData.location.localtime)} at{" "}
          {formatTime(weatherData.location.localtime)}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Last updated: {formatTime(weatherData.current.last_updated)}
        </p>
      </motion.div>

      {/* Weather Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <WeatherMetrics weatherData={weatherData} />
      </motion.div>

      {/* Detailed Weather Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <WeatherDetails weatherData={weatherData} />
      </motion.div>
    </div>
  );
};

export default WeatherDashboard;
