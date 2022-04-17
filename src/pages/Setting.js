import React, { useState } from "react";
import "./Setting.css";
import SettingButton from "./SettingButton";

const Setting = () => {
  return (
    <div class="container h-100">
      <div class="settingBackground">
        <div class="onBoardingBanner">

          <h1 id="settingTitle">Setting</h1>
          <div id="notification">
            <p>Notifications</p>
          </div>

          <div id="buttonsDiv">
            <SettingButton name="ECS 150"></SettingButton>
            <SettingButton name="ECS 120"></SettingButton>
            <SettingButton name="ECS 188"></SettingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;