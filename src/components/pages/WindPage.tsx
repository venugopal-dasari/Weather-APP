import React from "react";
import { motion } from "framer-motion";
import { WeatherData } from "../../types/weather";
import { Wind, Navigation, Gauge, Cloud } from "lucide-react";

interface WindPageProps {
  weatherData: WeatherData;
}

const WindPage: React.FC<WindPageProps> = ({ weatherData }) => {
  const getWindDirectionArrow = (direction: string) => {
    const directions: { [key: string]: string } = {
      N: "↑",
      NNE: "↑",
      NE: "↗",
      ENE: "↗",
      E: "→",
      ESE: "→",
      SE: "↘",
      SSE: "↘",
      S: "↓",
      SSW: "↓",
      SW: "↙",
      WSW: "↙",
      W: "←",
      WNW: "←",
      NW: "↖",
      NNW: "↖",
    };
    return directions[direction] || "→";
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
          <Wind className="w-8 h-8 text-cyan-400 mr-3" />
          <h2 className="text-3xl font-bold text-white">Wind & Atmospheric</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Wind className="w-5 h-5 mr-2" />
                Wind Information
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-white/80">Wind Speed</span>
                  <span className="font-semibold text-white">
                    {weatherData.current.wind_kph} km/h (
                    {weatherData.current.wind_mph} mph)
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-white/80">Wind Direction</span>
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">
                      {getWindDirectionArrow(weatherData.current.wind_dir)}
                    </span>
                    <span className="font-semibold text-white">
                      {weatherData.current.wind_dir} (
                      {weatherData.current.wind_degree}°)
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-white/80">Gust Speed</span>
                  <span className="font-semibold text-white">
                    {weatherData.current.gust_kph} km/h (
                    {weatherData.current.gust_mph} mph)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Gauge className="w-5 h-5 mr-2" />
                Atmospheric Data
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-white/80">Pressure</span>
                  <span className="font-semibold text-white">
                    {weatherData.current.pressure_mb} mb (
                    {weatherData.current.pressure_in} inHg)
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-white/80">Cloud Cover</span>
                  <span className="font-semibold text-white">
                    {weatherData.current.cloud}%
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-white/80">Visibility</span>
                  <span className="font-semibold text-white">
                    {weatherData.current.vis_km} km (
                    {weatherData.current.vis_miles} miles)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white/20 backdrop-blur-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Navigation className="w-5 h-5 mr-2" />
            Wind Direction Compass
          </h3>
          <div className="text-center">
            <div className="text-6xl font-bold text-cyan-300 mb-4">
              {getWindDirectionArrow(weatherData.current.wind_dir)}
            </div>
            <div className="text-white/80 mb-2">
              {weatherData.current.wind_dir} ({weatherData.current.wind_degree}
              °)
            </div>
            <div className="text-sm text-white/60">
              Wind blowing from {weatherData.current.wind_dir}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WindPage;
