import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import SearchBox from "../components/SearchBox";
import cities from "../lib/city.list.json";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";
import Button from "react-bootstrap/Button";
import styles from "../styles/Home.module.scss";
import WeatherTable from "../components/WeatherTable";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);

  const { user, isLoading, error } = useUser();

  const handleCitySearch = (query) => {
    setSelectedCity(query);
  };

  const handleReset = () => {
    setSelectedCity(null);
    setWeatherInfo(null);
    setSearchVisible(false);
  };

  const handleFetchWeather = (city) => {
    const cityStr = city.replace(/ /g, "+"); // replace all spaces with + for http requests
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityStr}&appid=${process.env.WEATHER_PUBLIC_API_KEY}`
      )
      .then((res) => {
        setWeatherInfo(res.data), setSearchVisible(true);
      });
  };

  console.log("weatherInfo ", weatherInfo);

  useEffect(() => {
    console.log("selectedCity ", selectedCity);
    if (selectedCity) {
      handleFetchWeather(selectedCity);
    }
  }, [selectedCity]);

  return (
    <>
      <Head>
        <title>The Weather App</title>
        <meta name="description" content="The Weather App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!user ? (
        <div className={styles.login__banner}>
          <div className={styles.login__banner__content}>
            <h2 className={styles.h2}>
              Welcome to the weather forecast web application. Please login with
              your Github user to use the application and view the weather in
              your city.
            </h2>
          </div>
          <div className="d-grid gap-2">
            <Button variant="primary" style={{ margin: "0 auto" }} size="lg">
              <Link href="/api/auth/login">Login</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="container">
          {!searchVisible ? (
            <SearchBox selectedCity={handleCitySearch} />
          ) : (
            <>
              <WeatherTable weather={weatherInfo} />
              <Button variant="primary" onClick={handleReset}>
                Back
              </Button>
            </>
          )}
        </div>
      )}
    </>
  );
}
