import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shorturl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async () => {
    if (!longUrl.trim()) {
      alert("Please enter a valid URL!");
      return;
    }

    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const response = await axios.post("http://localhost:8080/shorten", {
        longUrl: longUrl,
      });

      // Construct full short URL for display
      const shortLink = response.data.shortUrl;
      console.log(shortLink);
      setShortUrl(shortLink);
    } catch (err) {
      setError("Failed to shorten URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="home">
        <div className="home-container">
          <h1>Shorten Your Long Links</h1>
          <p>Paste your long URL below to get a smart, shareable short link.</p>

          <form
            className="url-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleShorten();
            }}
          >
            <input
              type="url"
              id="url-input"
              placeholder="Enter your long URL..."
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
            />
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Shortening..." : "Shorten"}
            </button>
          </form>

          {loading && (
            <div className="loader">
              <div className="spinner"></div>
              <p>Generating your short link...</p>
            </div>
          )}
          {error && <p className="error-text">{error}</p>}
          {shorturl && !loading && (
            <div className="result-box">
              <h3>Your Short Link:</h3>
              <p>
                <a href={shorturl} target="_blank" rel="noopener noreferrer">
                  {shorturl}
                </a>
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shorturl);
                  alert("Copied to clipboard!");
                }}
                className="submit-btn"
              >
                Copy
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
