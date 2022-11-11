import React, { useState } from "react";
import cities from "../lib/city.list.json";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/SearchBox.module.scss";

const SearchBox = ({ placeholder, selectedCity }) => {
  const [query, setQuery] = useState(""); // state for initial search query
  const [results, setResults] = useState([]); // state for storing init search query in matchingCities list for autocomplete search

  const onChange = (e) => {
    const strQuery = e.target.value;
    setQuery(strQuery);

    let matchingCities = [];

    if (strQuery.length > 3) {
      // loop array of cities
      cities.filter((city) => {
        // breaks the loop if matchingCities already has 5
        if (matchingCities.length >= 5) {
          return false;
        }

        // declare matching variables for each city
        const match = city.name
          .toLowerCase()
          .startsWith(strQuery.toLowerCase());
        if (match) {
          matchingCities.push(city);
        }
      });
    }

    return setResults(matchingCities);
  };

  return (
    <div className={styles.searchbox}>
      <input
        type="text"
        value={query}
        onChange={onChange}
        placeholder={placeholder ? placeholder : "City"}
      />

      {query.length > 3 && (
        <ul>
          {results.length > 0 ? (
            results.map((city) => {
              return (
                <AnimatePresence>
                  <motion.li
                    key={city.slug}
                    onClick={() => selectedCity(city.name)}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.span
                      animate={{ x: [50, 150, 50], opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.5,
                      }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {city.name}
                      {city.state ? `, ${city.state}` : ""} ({city.country})
                    </motion.span>
                  </motion.li>
                </AnimatePresence>
              );
            })
          ) : (
            <li className="search__no-results">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
