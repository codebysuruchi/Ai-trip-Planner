import { useEffect, useState } from "react";
import axios from "axios";

const PlaceAutocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          {
            params: {
              q: query,
              format: "json",
              addressdetails: 1,
              limit: 5,
            },
            headers: {
              "User-Agent": "ai-trip-planner/1.0 (your-email@example.com)",
            },
          }
        );

        setResults(res.data);
      } catch (error) {
        console.error("Nominatim error:", error);
      } finally {
        setLoading(false);
      }
    }, 500); // debounce 500ms

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        placeholder="Enter city or place"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input"
      />

      {loading && <p>Loading...</p>}

      {results.length > 0 && (
        <ul className="dropdown">
          {results.map((place) => (
            <li
              key={place.place_id}
              onClick={() => {
                onSelect({
                  label: place.display_name,
                  lat: place.lat,
                  lon: place.lon,
                });
                setQuery(place.display_name);
                setResults([]);
              }}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlaceAutocomplete;
