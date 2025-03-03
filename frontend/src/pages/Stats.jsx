import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Stats = () => {
  const { shortCode } = useParams();
  const [stats, setStats] = useState(null);
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/stats/${shortCode}`)
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, [shortCode]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">URL Stats</h1>
      {stats ? (
        <div className="mt-4 p-4 bg-white dark:bg-gray-800 dark:text-gray-200 shadow rounded">
          <p>
            <strong>Original URL:</strong> {stats.originalUrl}
          </p>
          <p>
            <strong>Clicks:</strong> {stats.clicks}
          </p>
        </div>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">Loading...</p>
      )}
    </div>
  );
};

export default Stats;