import React from "react";
import { motion } from "framer-motion";
import { WeatherData } from "../../types/weather";

interface TemperaturePageProps {
  weatherData: WeatherData;
}

const TemperaturePage: React.FC<TemperaturePageProps> = ({ weatherData }) => {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= 31) return "temp-above-30";
    if (temp >= 21) return "temp-21-to-30";
    if (temp >= 11) return "temp-11-to-20";
    if (temp >= 1) return "temp-1-to-10";
    if (temp >= -10) return "temp-10-to-0";
    return "temp-below-10";
  };

  const getVisibilityStatus = (visibility: number) => {
    if (visibility >= 10) return "Excellent";
    if (visibility >= 5) return "Good";
    if (visibility >= 2) return "Moderate";
    return "Poor";
  };

  const getVisibilityColor = (visibility: number) => {
    if (visibility >= 10) return "text-green-600";
    if (visibility >= 5) return "text-yellow-600";
    if (visibility >= 2) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          🌡️ Temperature & Visibility
        </h1>
        <p className="text-white/80 text-lg">
          Detailed temperature and visibility information for{" "}
          {weatherData.location.name}
        </p>
      </motion.div>

      {/* Current Temperature Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="weather-card p-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Current Temperature
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-6xl font-bold mb-2">
              <span className={getTemperatureColor(weatherData.current.temp_c)}>
                {weatherData.current.temp_c}°C
              </span>
            </div>
            <p className="text-gray-600 text-lg">Current Temperature</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">
              <span
                className={getTemperatureColor(weatherData.current.feelslike_c)}
              >
                {weatherData.current.feelslike_c}°C
              </span>
            </div>
            <p className="text-gray-600">Feels Like</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">
              <span className="text-blue-600">
                {weatherData.current.temp_f}°F
              </span>
            </div>
            <p className="text-gray-600">Fahrenheit</p>
          </div>
        </div>
      </motion.div>

      {/* Temperature Range Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="weather-card p-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Temperature Range
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2 text-red-600">
              {weatherData.forecast?.forecastday[0]?.day.maxtemp_c || "N/A"}°C
            </div>
            <p className="text-gray-600 text-lg">Maximum Today</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2 text-blue-600">
              {weatherData.forecast?.forecastday[0]?.day.mintemp_c || "N/A"}°C
            </div>
            <p className="text-gray-600 text-lg">Minimum Today</p>
          </div>
        </div>
      </motion.div>

      {/* Visibility Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="weather-card p-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Visibility Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">
              <span className={getVisibilityColor(weatherData.current.vis_km)}>
                {weatherData.current.vis_km} km
              </span>
            </div>
            <p className="text-gray-600 text-lg">Visibility Distance</p>
            <p
              className={`text-sm font-medium ${getVisibilityColor(
                weatherData.current.vis_km
              )}`}
            >
              {getVisibilityStatus(weatherData.current.vis_km)} Visibility
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2 text-blue-600">
              {weatherData.current.vis_miles} miles
            </div>
            <p className="text-gray-600 text-lg">Visibility (Miles)</p>
          </div>
        </div>
      </motion.div>

      {/* Additional Temperature Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="weather-card p-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Additional Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2 text-gray-800">
              {weatherData.current.uv}
            </div>
            <p className="text-gray-600">UV Index</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2 text-gray-800">
              {weatherData.current.pressure_mb} mb
            </div>
            <p className="text-gray-600">Pressure</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2 text-gray-800">
              {formatTime(weatherData.current.last_updated)}
            </div>
            <p className="text-gray-600">Last Updated</p>
          </div>
        </div>
      </motion.div>

      {/* Weather Condition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="weather-card p-8 text-center"
      >
        <div className="text-6xl mb-4">
          {weatherData.current.condition.icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {weatherData.current.condition.text}
        </h3>
        <p className="text-gray-600">
          Current weather condition in {weatherData.location.name}
        </p>
      </motion.div>
    </div>
  );
};

export default TemperaturePage;
