export const kelvinToFahrenheit = (tempKelvin) => {
  // Convert the temperature from Kelvin to degrees Celsius
  let tempCelsius = tempKelvin + 273.15;

  // Convert the temperature from degrees Celsius to degrees Fahrenheit
  let tempFahrenheit = tempCelsius * 1.8 + 32;

  return tempFahrenheit;
};
