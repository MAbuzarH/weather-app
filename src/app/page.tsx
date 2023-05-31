'use client'
import Image from 'next/image'
import { useState } from 'react';



export default function Home() {
  const apiKey = "d7e158e619fd24009922ef9a5e8df48e";
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        // `https://api.openweathermap.org/data/2.5/onecall?q=${city}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const currentDate: Date = new Date();

  // Get the current date
  const date: string = currentDate.toLocaleDateString("en-US", {
    // year: 'numeric',
    month: "long",
    day: "numeric",
  });

  // Get the current day
  const day: string = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
  });

  // Get the current time
  const time: string = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    // second: 'numeric',
  });
  const convertMetersToKilometers = (meters: number) => {
    return (meters / 1000).toFixed(2);
  };
  return (
    <div
      style={{
        backgroundImage: `url('./back-im.avif')`,
      }}
      className="min-h-screen bg-cover bg-center  bg-gradient-to-br from-[#394F68] to-[#183B7E]  flex justify-around items-center p-2"
    >
      <div className="border-2 shadow-black border-blue-100 p-2 h-screen backdrop-blur-lg shadow-xl w-[84%] lg:w-[70%]">
        <h1 className="text-5xl bolder text-ellipsis text-white text-center py-4">
          SEARCH WEATHER
        </h1>
        <div className=" mb-3  bg-transparent border-2 p-4 rounded-md">
          <form onSubmit={handleSubmit}>
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                placeholder="Enter city name"
                value={city}
                onChange={handleInputChange}
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        {weatherData && (
          <div className="bg-transparent p-2 text-white  justify-between px-10 sm:flex border-2 py-10 rounded-md">
            <div >
              <h1 className="text-6xl bolder p-2"> {weatherData.name}</h1>
              <p className="px-5">
                {day} {date}, {time}
              </p>
              <p className="flex  items-center text-2xl">
                {weatherData.weather && weatherData.weather.length > 0 && (
                  <img
                    className="w-20"
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                    alt={weatherData.weather[0].description}
                  />
                )}
                {weatherData.main.temp} °
              </p>
            </div>
            <div>
              <p className="text-2xl">{weatherData.weather[0].main}</p>
              <p>{weatherData.weather[0].description}</p>
              <p>HUMIDITY: {weatherData.main.humidity}</p>
              <p>FEELS LIKE: {weatherData.main.feels_like}°</p>

              <p>
                VISIBALITY: {convertMetersToKilometers(weatherData.visibility)}{" "}
                km
              </p>
              <p>
                WIND SPEED: {convertMetersToKilometers(weatherData.wind.speed)}{" "}
                km
              </p>
              <p>
                WIND DEG: {convertMetersToKilometers(weatherData.wind.deg)} °
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

