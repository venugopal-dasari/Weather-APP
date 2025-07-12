import React from "react";
import { motion } from "framer-motion";
import { WeatherData } from "../../types/weather";
import { MapPin, Clock, Globe } from "lucide-react";

interface LocationPageProps {
  weatherData: WeatherData;
}

const LocationPage: React.FC<LocationPageProps> = ({ weatherData }) => {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="weather-card p-8">
        <div className="flex items-center mb-6">
          <MapPin className="w-8 h-8 text-blue-400 mr-3" />
          <h2 className="text-3xl font-bold text-white">Location Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                City Information
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-white/80">City Name</span>
                  <span className="font-semibold text-white">
                    {weatherData.location.name}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-white/80">Country</span>
                  <span className="font-semibold text-white">
                    {weatherData.location.country}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-white/80">Region</span>
                  <span className="font-semibold text-white">
                    {weatherData.location.region || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Time Information
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-white/80">Local Date</span>
                  <span className="font-semibold text-white">
                    {formatDate(weatherData.location.localtime)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-white/80">Local Time</span>
                  <span className="font-semibold text-white">
                    {formatTime(weatherData.location.localtime)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-white/80">Last Updated</span>
                  <span className="font-semibold text-white">
                    {formatTime(weatherData.current.last_updated)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white/20 backdrop-blur-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Geographic Coordinates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">
                {weatherData.location.lat.toFixed(4)}°
              </div>
              <div className="text-white/80">Latitude</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 mb-2">
                {weatherData.location.lon.toFixed(4)}°
              </div>
              <div className="text-white/80">Longitude</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationPage;
