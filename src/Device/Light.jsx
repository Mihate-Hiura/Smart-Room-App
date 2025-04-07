import "./Light.css";
import "./Device.css";
import DeviceName from "./DeviceCard/DeviceName.jsx";
import DeviceStatus from "./DeviceCard/DeviceStatus.jsx";
import DeviceMode from "./DeviceCard/DeviceMode.jsx";
import CheckBox from "../Button/CheckBox.jsx";
import lightbulbAPI from "../API/lightbulbAPI.js";
import { useState, useEffect } from "react";
import lightmodeAPI from "../API/lightmodeAPI.js";
function Light() {
  const [bulb, setBulb] = useState("Off");
  const [localBulb, setLocalBulb] = useState("Off");
  const [isChanging, setIsChanging] = useState(false);
  const [mode, setMode] = useState("Custom");
  const [modeIcon, setModeIcon] = useState("fa-solid fa-laptop-code icon-blue");
  const handleBulb = async () => {
    setLocalBulb(bulb==="On"?"Off":"On");
    setMode("Custom");
    setModeIcon("fa-solid fa-laptop-code icon-blue");
    setIsChanging(true);
    bulb === "On"
      ? await lightbulbAPI.add({ value: "Off" })
      : await lightbulbAPI.add({ value: "On" });
    setIsChanging(false);
  };
  useEffect(() => {
    if(!isChanging){
      const fetchBulb = async () => {
        const bulbList = await lightbulbAPI.getAll();
        const lightmodeList = await lightmodeAPI.getAll();
        setBulb(bulbList);
        setLocalBulb(bulbList)
        setMode(lightmodeList)
      };
      fetchBulb();
      const updateBulb = setInterval(() => {
        fetchBulb();
      }, 2000);
      return () => clearInterval(updateBulb);
    }
  }, [isChanging]);
  useEffect(() => {
    setModeIcon(mode === "Auto"?"fa-solid fa-arrows-spin icon-blue":"fa-solid fa-laptop-code icon-blue");
  }, [mode])
  const handleMode = async () => {
    if(mode==="Custom"){
      setMode("Auto");
      setModeIcon("fa-solid fa-arrows-spin icon-blue");
      setIsChanging(true);
      await lightmodeAPI.add({value: "Auto"})
      setIsChanging(false);
    }
    else if(mode==="Auto"){
      setMode("Custom");
      setModeIcon("fa-solid fa-laptop-code icon-blue");
      setIsChanging(true);
      await lightmodeAPI.add({value: "Custom"})
      setIsChanging(false);
    }
  }
  return (
    <>
      <div class="device-card">
        <div class="device-header">
          <DeviceName icon="fa-solid fa-lightbulb">Smart Light</DeviceName>
          <CheckBox action={handleBulb} isChecked={localBulb === "On"} />
        </div>
        <div class="mode">
          <DeviceMode
            icon={modeIcon}
            content="Mode"
            status={mode}
            mode={handleMode}
          />
        </div>
        <div class="light-status">
          <DeviceStatus dot="status-dot online">{localBulb}</DeviceStatus>
        </div>
      </div>
    </>
  );
}

export default Light;
