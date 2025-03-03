import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/shorten", {
        originalUrl: url,
      });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      alert("Error: " + err);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        URL Shortener
      </h1>

      <input
        type="text"
        placeholder="Enter your URL"
        className="border p-2 rounded w-80 dark:bg-gray-700 dark:text-white"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={handleShorten}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 flex items-center"
      >
        {loading ? (
          <span className="animate-spin h-5 w-5 border-t-2 border-white rounded-full mr-2"></span>
        ) : null}
        Shorten URL
      </button>

      {shortUrl && (
        <div className="mt-4 flex items-center space-x-2">
          <a
            href={shortUrl}
            target="_blank"
            className="text-blue-600 dark:text-blue-400"
          >
            {shortUrl}
          </a>
          <button
            onClick={handleCopy}
            className="bg-gray-300 dark:bg-[#eaeaeadb] px-3 py-1 rounded text-sm"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
