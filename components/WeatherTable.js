import React from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";
import { kelvinToFahrenheit } from "../helpers/kelvinToFahrenheit";

const WeatherTable = ({ weather }) => {
  console.log("weather: ", weather);
  return (
    <Table striped bordered hover>
      <thead>
        <tr style={{ backgroundColor: "#ededed" }}>
          <th colSpan={6}>Date</th>
        </tr>
        <tr>
          <th>(mm/dd/yyyy)</th>
          <th>Temp(F)</th>
          <th>Description</th>
          <th>Maine</th>
          <th>Pressure</th>
          <th>Humidity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{moment().format("MM/DD/YYYY")}</td>
          <td>{kelvinToFahrenheit(weather.main.temp)}</td>
          <td>{weather.weather[0].description}</td>
          <td>{weather.weather[0].main}</td>
          <td>{weather.main.pressure}</td>
          <td>{weather.main.humidity}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default WeatherTable;
