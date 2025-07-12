import React from "react";
import { motion } from "framer-motion";
import { WeatherData } from "../types/weather";
import {
  Wind,
  Droplets,
  Gauge,
  Eye,
  Sun,
  CloudRain,
  Navigation,
  Thermometer,
} from "lucide-react";

interface WeatherMetricsProps {
  weatherData: WeatherData;
}

const WeatherMetrics: React.FC<WeatherMetricsProps> = ({ weatherData }) => {
  const getTemperatureColor = (temp: number) => {
    if (temp >= 31) return "temp-above-30";
    if (temp >= 21) return "temp-21-to-30";
    if (temp >= 11) return "temp-11-to-20";
    if (temp >= 1) return "temp-1-to-10";
    if (temp >= -10) return "temp-10-to-0";
    return "temp-below-10";
  };

  const metrics = [
    {
      icon: <Wind className="w-6 h-6" />,
      label: "Wind Speed",
      value: `${weatherData.current.wind_kph} km/h`,
      subValue: `${weatherData.current.wind_mph} mph`,
      color: "weather-wind",
      bgColor: "bg-white/20",
      borderColor: "border-white/30",
    },
    {
      icon: <Navigation className="w-6 h-6" />,
      label: "Wind Direction",
      value: weatherData.current.wind_dir,
      subValue: `${weatherData.current.wind_degree}°`,
      color: "weather-wind",
      bgColor: "bg-white/20",
      borderColor: "border-white/30",
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      label: "Humidity",
      value: `${weatherData.current.humidity}%`,
      subValue:
        weatherData.current.humidity > 60
          ? "High"
          : weatherData.current.humidity > 30
          ? "Moderate"
          : "Low",
      color: "weather-rain",
      bgColor: "bg-white/20",
      borderColor: "border-white/30",
    },
    {
      icon: <Gauge className="w-6 h-6" />,
      label: "Pressure",
      value: `${weatherData.current.pressure_mb} mb`,
      subValue: `${weatherData.current.pressure_in} inHg`,
      color: "text-white",
      bgColor: "bg-white/20",
      borderColor: "border-white/30",
    },
    {
      icon: <CloudRain className="w-6 h-6" />,
      label: "Precipitation",
      value: `${weatherData.current.precip_mm} mm`,
      subValue: `${weatherData.current.precip_in} in`,
      color: "weather-rain",
      bgColor: "bg-white/20",
      borderColor: "border-white/30",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      label: "Visibility",
      value: `${weatherData.current.vis_km} km`,
      subValue: `${weatherData.current.vis_miles} miles`,
      color: "text-white",
      bgColor: "bg-white/20",
      borderColor: "border-white/30",
    },
    {
      icon: <Sun className="w-6 h-6" />,
      label: "UV Index",
      value: weatherData.current.uv.toString(),
      subValue: getUVLevel(weatherData.current.uv),
      color: "weather-clear",
      bgColor: "bg-white/20",
      borderColor: "border-white/30",
    },
    {
      icon: <Thermometer className="w-6 h-6" />,
      label: "Feels Like",
      value: `${Math.round(weatherData.current.feelslike_c)}°C`,
      subValue: `${Math.round(weatherData.current.feelslike_f)}°F`,
      color: getTemperatureColor(weatherData.current.feelslike_c),
      bgColor: "bg-white/20",
      borderColor: "border-white/30",
    },
  ];

  function getUVLevel(uv: number): string {
    if (uv <= 2) return "Low";
    if (uv <= 5) return "Moderate";
    if (uv <= 7) return "High";
    if (uv <= 10) return "Very High";
    return "Extreme";
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="weather-card p-6">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        Weather Metrics
      </h3>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className={`metric-card border ${metric.borderColor} ${metric.bgColor} hover:shadow-lg transition-all duration-200`}
          >
            <div className="flex items-center mb-3">
              <div className={`${metric.color} mr-2`}>{metric.icon}</div>
              <h4 className="font-semibold text-white text-sm">
                {metric.label}
              </h4>
            </div>

            <div className="text-center">
              <p className="text-xl font-bold text-white mb-1">
                {metric.value}
              </p>
              <p className="text-xs text-white/80">{metric.subValue}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default WeatherMetrics;
