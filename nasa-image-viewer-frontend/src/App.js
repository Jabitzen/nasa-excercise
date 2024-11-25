import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function App() {
  const [dates, setDates] = useState({});
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState({});

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 7 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 5 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 3 },
  };

  useEffect(() => {
    console.log("Updated dates:", dates);
  }, [dates]);

  const handleFetchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(
        "http://localhost:3001/api/images/fetch"
      );
      setDates(response.data.dates);
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("An error occurred while fetching images.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadSubmit = async (url, date) => {
    setDownloading((prev) => ({ ...prev, [date]: true }));

    try {
      await axios.post("http://localhost:3001/api/images/download", {
        url,
        date,
      });
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("An error occurred while downloading image.");
    } finally {
      setDownloading((prev) => ({ ...prev, [date]: false }));
    }
  };

  return (
    <div className="App">
      <h1 className="App-header">Nasa Project</h1>

      <button onClick={handleFetchSubmit} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Images"}
      </button>

      {Object.keys(dates).length > 0 && (
        <div className="img-container">
          {Object.entries(dates).map(([key, values]) => (
            <div key={key}>
              <h3>{key}</h3>
              <Carousel responsive={responsive}>
                {values.map((value, index) => (
                  <div key={index} className="img-box">
                    <img className="rover-img" src={`${value}`} alt={key} />
                    <button
                      onClick={() => handleDownloadSubmit(value, key)}
                      disabled={downloading[key]}
                    >
                      {downloading[key] ? "Downloading..." : "Download"}
                    </button>
                  </div>
                ))}
              </Carousel>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
