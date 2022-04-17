import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import "./Setting.css";
import "./Home.css";
import SettingButton from "./SettingButton";

const Setting = () => {
  const navigate = useNavigate();
  const handleOnClick = useCallback(
    () => navigate("/login", { replace: true }),
    [navigate]
  );

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
          <button class="aBtn" onClick={handleOnClick}> <p id="registerText">Logout</p></button>
        </div>
      </div>
    </div>
  );
};

export default Setting;