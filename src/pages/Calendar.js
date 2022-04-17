import React from "react";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  Month,
} from "@syncfusion/ej2-react-schedule";
import "./Calendar.css";

import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "ORg4AjUWIQA/Gnt2VVhhQlFaclhJWHxIe0x0RWFbb1d6cV1MY1xBJAtUQF1hS35Xd0NjXX1WcXZXRmlV"
);

const Calendar = () => {
  return (
    <div>
      Calendar
      <ScheduleComponent>
        <Inject services={[Day, Week, Month]} />
      </ScheduleComponent>
    </div>

  );
};

export default Calendar;
