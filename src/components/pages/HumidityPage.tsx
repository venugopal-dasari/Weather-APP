import React from "react";
import { motion } from "framer-motion";
import { WeatherData } from "../../types/weather";
import { Droplets, CloudRain, Sun, Cloud } from "lucide-react";

interface HumidityPageProps {
  weatherData: WeatherData;
}

const HumidityPage: React.FC<HumidityPageProps> = ({ weatherData }) => {
  const getHumidityLevel = (humidity: number) => {
    if (humidity >= 80)
      return {
        level: "Very High",
        color: "text-red-300",
        bgColor: "bg-red-500/20",
      };
    if (humidity >= 60)
      return {
        level: "High",
        color: "text-orange-300",
        bgColor: "bg-orange-500/20",
      };
    if (humidity >= 40)
      return {
        level: "Moderate",
        color: "text-yellow-300",
        bgColor: "bg-yellow-500/20",
      };
    return {
      level: "Low",
      color: "text-green-300",
      bgColor: "bg-green-500/20",
    };
  };

  const humidityInfo = getHumidityLevel(weatherData.current.humidity);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="weather-card p-8">
        <div className="flex items-center mb-6">
          <Droplets className="w-8 h-8 text-cyan-400 mr-3" />
          <h2 className="text-3xl font-bold text-white">
            Humidity & Precipitation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Droplets className="w-5 h-5 mr-2" />
                Humidity Data
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-white/80">Humidity Level</span>
                  <div className="flex items-center">
                    <span className="font-semibold text-white mr-2">
                      {weatherData.current.humidity}%
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${humidityInfo.bgColor} ${humidityInfo.color}`}
                    >
                      {humidityInfo.level}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-white/80">Cloud Cover</span>
                  <span className="font-semibold text-white">
                    {weatherData.current.cloud}%
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-white/80">UV Index</span>
                  <span className="font-semibold text-white">
                    {weatherData.current.uv}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <CloudRain className="w-5 h-5 mr-2" />
                Precipitation Data
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-white/80">Precipitation</span>
                  <span className="font-semibold text-white">
                    {weatherData.current.precip_mm} mm (
                    {weatherData.current.precip_in} in)
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-white/80">Rain Probability</span>
                  <span className="font-semibold text-white">
                    {weatherData.current.precip_mm > 0 ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-white/80">Weather Condition</span>
                  <span className="font-semibold text-white">
                    {weatherData.current.condition.text}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white/20 backdrop-blur-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Humidity Visualization
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/80">Current Humidity</span>
              <span className="font-semibold text-white">
                {weatherData.current.humidity}%
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-blue-400 to-cyan-400 h-4 rounded-full transition-all duration-500"
                style={{ width: `${weatherData.current.humidity}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-white/60">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HumidityPage;
