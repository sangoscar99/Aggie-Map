import React, { useState } from "react";
import Switch from "react-ios-switch";

export default function SettingButton(props) {
  const [checked, setChecked] = React.useState(
    localStorage.getItem(props.name) == "false"
  );    

  React.useEffect(() => {
    localStorage.setItem(props.name, !checked);
  });


  return (
    <div class="classButton">
      {props.name}
      <Switch
        checked={checked}
        onChange={() => {
          setChecked(!checked);
        }}
      />
    </div>
  );
}