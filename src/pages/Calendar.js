import React from "react";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  Month,
} from "@syncfusion/ej2-react-schedule";
import "./Calendar.css";
import NavBar from "./Navbar"

//import userJson from "../userData/user_data.json"


import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "ORg4AjUWIQA/Gnt2VVhhQlFaclhJWHxIe0x0RWFbb1d6cV1MY1xBJAtUQF1hS35Xd0NjXX1WcXZXRmlV"
);

const Calendar = () => {
  var userEvents = {};
  var userEventId = [];
  function processdata(userEvents) {
    return function (data) {
      try {
        var singleEvent = data.data[0];
        if (!userEventId.includes(singleEvent.Id)) {
          userEventId.push(singleEvent.Id);

          console.log(data.data[0]);
          userEvents[singleEvent.Id] = {
            Id: data.data[0].Id,
            Subject: data.data[0].Subject,
            StartTime: Date.parse(data.data[0].StartTime),
            EndTime: Date.parse(data.data[0].EndTime),
            Location: data.data[0].Location,
          };

        } else {
          userEventId.splice(userEventId.indexOf(singleEvent.Id));
          delete userEvents[singleEvent.Id];
          
        }
        //writeJsonFile(userJson, userEvents)
        console.log(userEvents);
      } catch (error) {
        console.log(error);
      }
    };
  }
  return (
    <div>
      Calendar
      <ScheduleComponent
        selectedDate={new Date(2019, 0, 10)}
        allowInline={false}
        actionComplete={processdata(userEvents)}
      >
        <Inject services={[Day, Week, Month]} />
      </ScheduleComponent>
      <div id = "navbarCalendar" class = "navbarSetting"><NavBar></NavBar></div>
    </div>

  );
};

export default Calendar;
