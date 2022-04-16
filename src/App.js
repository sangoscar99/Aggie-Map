import React, { Component } from "react";
import "./App.css";

// new
import { StyleSheet, Text, View } from "react-native";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  Month,
} from "@syncfusion/ej2-react-schedule";
import "./pages/Calender.css";
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "ORg4AjUWIQA/Gnt2VVhhQlFaclhJWHxIe0x0RWFbb1d6cV1MY1xBJAtUQF1hS35Xd0NjXX1WcXZXRmlV"
);

import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Map from "./pages/Map";
import Calendar from "./pages/Calendar";
import Setting from "./pages/Setting";

export default function App() {
  return (
    <div>
      <ScheduleComponent>
        <Inject services={[Day, Week, Month]} />
      </ScheduleComponent>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
