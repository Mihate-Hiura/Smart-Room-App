import { useEffect, useState } from "react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import Header from "../Header/Header";
import historyAPI from "../API/historyAPI";
import "./HistoryPage.css";
import { getCookie } from "../App.jsx";
import HistoryTable from "./HistoryTable";

function HistoryPage() {
  const [lightHistory, setLightHistory] = useState([]);
  const [tempHistory, setTempHistory] = useState([]);
  const [humidHistory, setHumidHistory] = useState([]);
  const [doorHistory, setDoorHistory] = useState([]);
  const [fanHistory, setFanHistory] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const lightData = await historyAPI.getFeedHistory("light");
        const tempData = await historyAPI.getFeedHistory("temp");
        const humidData = await historyAPI.getFeedHistory("humid");
        const doorData = await historyAPI.getFeedHistory("door");
        const fanData = await historyAPI.getFeedHistory("fan");

        setLightHistory(Array.isArray(lightData) ? lightData : []);
        setTempHistory(Array.isArray(tempData) ? tempData : []);
        setHumidHistory(Array.isArray(humidData) ? humidData : []);
        setDoorHistory(Array.isArray(doorData) ? doorData : []);
        setFanHistory(Array.isArray(fanData) ? fanData : []);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    }
    fetchHistory();
  }, []);

  return (
    <section className="history-container">
      <Header username={getCookie("username")}>History</Header>
      {/* Tabs Header */}
      <div className="history-tabs">
        <NavLink
          to="/History/light"
          className={({ isActive }) => (isActive ? "tab active" : "tab")}
        >
          Light
        </NavLink>
        <NavLink
          to="/History/temp"
          className={({ isActive }) => (isActive ? "tab active" : "tab")}
        >
          Temperature
        </NavLink>
        <NavLink
          to="/History/humid"
          className={({ isActive }) => (isActive ? "tab active" : "tab")}
        >
          Humidity
        </NavLink>
        <NavLink
          to="/History/door"
          className={({ isActive }) => (isActive ? "tab active" : "tab")}
        >
          Door
        </NavLink>
        <NavLink
          to="/History/fan"
          className={({ isActive }) => (isActive ? "tab active" : "tab")}
        >
          Fan
        </NavLink>
      </div>
      {/* Content switching based on tab (nested routes) */}
      <Routes>
        {/* Default to light */}
        <Route index element={<Navigate to="light" replace />} />
        <Route path="light" element={<HistoryTable data={lightHistory} col2Name="Value (LUX)" />} />
        <Route path="temp" element={<HistoryTable data={tempHistory} col2Name="Value (°C)" />} />
        <Route path="humid" element={<HistoryTable data={humidHistory} col2Name="Value (%)" />} />
        <Route path="door" element={<HistoryTable data={doorHistory} col2Name="State" />} />
        <Route path="fan" element={<HistoryTable data={fanHistory} col2Name="Speed" />} />
      </Routes>
    </section>
  );
}

export default HistoryPage;