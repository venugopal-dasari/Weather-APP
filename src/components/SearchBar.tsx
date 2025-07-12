import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, X } from "lucide-react";
import { SearchResult } from "../types/weather";
import { weatherApi } from "../services/weatherApi";
import toast from "react-hot-toast";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationClick: () => void;
  currentCity: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onLocationClick,
  currentCity,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchCities = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        setShowResults(false);
        return;
      }

      setIsSearching(true);
      try {
        const searchResults = await weatherApi.searchCities(query);
        setResults(searchResults);
        setShowResults(searchResults.length > 0);
      } catch (error) {
        console.error("Search error:", error);
        toast.error("Failed to search cities");
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchCities, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleCitySelect = (city: SearchResult) => {
    onSearch(city.name);
    setQuery("");
    setShowResults(false);
    toast.success(`Weather data loaded for ${city.name}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery("");
      setShowResults(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className="max-w-3xl mx-auto mb-12" ref={searchRef}>
      <div className="relative">
        <form onSubmit={handleSubmit} className="relative">
          <div className="search-container p-2">
            <div className="relative flex items-center">
              <div className="absolute left-6 text-white/80">
                <Search size={24} />
              </div>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search for a city (e.g., ${currentCity})`}
                className="search-input w-full pl-16 pr-20 py-6 text-white placeholder-white/60 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              />

              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-20 text-white/80 hover:text-white transition-colors p-2"
                >
                  <X size={20} />
                </button>
              )}

              <button
                type="button"
                onClick={onLocationClick}
                className="absolute right-4 p-3 text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-110"
                title="Use current location"
              >
                <MapPin size={24} />
              </button>
            </div>
          </div>
        </form>

        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-4 bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 z-50 max-h-80 overflow-y-auto"
            >
              {isSearching ? (
                <div className="p-6 text-center text-white">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-3"></div>
                  <p className="text-lg font-medium">Searching...</p>
                </div>
              ) : results.length > 0 ? (
                <div className="py-3">
                  {results.map((city) => (
                    <button
                      key={city.name}
                      onClick={() => handleCitySelect(city)}
                      className="w-full px-6 py-4 text-left hover:bg-white/20 transition-all duration-300 flex items-center justify-between group"
                    >
                      <div>
                        <div className="font-semibold text-white text-lg group-hover:text-blue-300 transition-colors">
                          {city.name}
                        </div>
                        <div className="text-sm text-white/80 group-hover:text-white transition-colors">
                          {city.state && `${city.state}, `}
                          {city.country}
                        </div>
                      </div>
                      <div className="text-xs text-white/60 group-hover:text-white/80 transition-colors">
                        {city.lat.toFixed(2)}, {city.lon.toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
              ) : query.trim().length >= 2 ? (
                <div className="p-6 text-center text-white">
                  <p className="text-lg font-medium">
                    No cities found for "{query}"
                  </p>
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchBar;
