import React from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Map from "./pages/Map";
import Calendar from "./pages/Calendar";
import Setting from "./pages/Setting";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/map" element={<Map />}></Route>
          <Route path="/setting" element={<Setting />}></Route>
          <Route path="/calendar" element={<Calendar />}></Route>
        </Routes>
        </Router>
    </div>
  );
}
