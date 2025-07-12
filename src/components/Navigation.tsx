import React from "react";
import { motion } from "framer-motion";
import { MapPin, Wind, Droplets, Thermometer } from "lucide-react";

interface NavigationProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  activePage,
  onPageChange,
}) => {
  const navItems = [
    {
      id: "overview",
      label: "Overview",
      icon: <Thermometer className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "location",
      label: "Location Details",
      icon: <MapPin className="w-5 h-5" />,
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "wind",
      label: "Wind & Atmospheric",
      icon: <Wind className="w-5 h-5" />,
      color: "from-cyan-500 to-blue-500",
    },
    {
      id: "humidity",
      label: "Humidity & Precipitation",
      icon: <Droplets className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "temperature",
      label: "Temperature & Visibility",
      icon: <Thermometer className="w-5 h-5" />,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex flex-wrap justify-center gap-3">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
              activePage === item.id
                ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                : "bg-white/20 backdrop-blur-lg text-white/80 hover:bg-white/30 hover:text-white border border-white/30"
            }`}
          >
            {item.icon}
            <span className="hidden sm:inline">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Navigation;
