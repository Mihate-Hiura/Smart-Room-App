import "./Fan.css";
import "./Device.css";
import DeviceName from "./DeviceCard/DeviceName";
import DeviceMode from "./DeviceCard/DeviceMode";
import DeviceStatus from "./DeviceCard/DeviceStatus";
import CheckBox from "../Button/CheckBox";
import RangeSlide from "../Button/RangeSlide";
import fanAPI from "../API/fanAPI";
import { useState, useEffect, useRef } from "react";

function Fan() {
  const [value, setValue] = useState(0);
  const [level, setLevel] = useState("Off");
  const [isChanging, setIsChanging] = useState(false);
  const [mode, setMode] = useState("Custom");
  const [modeIcon, setModeIcon] = useState("fa-solid fa-laptop-code icon-blue")
  const timeoutRef = useRef(null);
  
  useEffect(() => {
    if(!isChanging){
      const fetchFan = async () => {
        const fanList = await fanAPI.getAll();
        setValue(fanList);
      };
      
      fetchFan();
      
      const updateFan = setInterval(() => {
        fetchFan();
      }, 2000);
      
      return () => clearInterval(updateFan);
    }
    
  }, [isChanging]);
  
  useEffect(() => {
    const handleLevel = () => {
      setLevel(value === "0" ? "Off" : `Level ${(value / 100) * 5}`);
    };
    handleLevel();
  }, [value]);
 
  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    setIsChanging(true);
    setMode("Custom");
    setModeIcon("fa-solid fa-laptop-code icon-blue");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      await fanAPI.add({ value: newValue });
      setIsChanging(false);
    }, 500); 

  };
  
  const handleInit = async ()=>{
    const newValue = value==="0"?"20":"0";
    setMode("Custom");
    setModeIcon("fa-solid fa-laptop-code icon-blue");
    setValue(newValue);
    setIsChanging(true);
    await fanAPI.add({ value: newValue });
    setIsChanging(false);
  }; 

  const handleMode = () => {
    if(mode==="Custom"){
      setMode("Rhythm");
      setModeIcon("fa-solid fa-wind icon-blue");
    }
    else if(mode==="Rhythm"){
      setMode("Auto");
      setModeIcon("fa-solid fa-arrows-spin icon-blue");
    }
    else if(mode==="Auto"){
      setMode("Custom");
      setModeIcon("fa-solid fa-laptop-code icon-blue");
    }
  }
 
  return (
    <>
      <div className="device-card">
        <div className="device-header">
          <DeviceName icon="fa-solid fa-fan">Smart Fan</DeviceName>
          <CheckBox action={handleInit} isChecked={value > 0}/>
        </div>
        <div className="mode">
          <DeviceMode
            icon={modeIcon}
            content="Mode"
            status={mode}
            mode={handleMode}
          />
        </div>
        <div className="fan-status">
          <RangeSlide value={value} action={handleChange} />
          <DeviceStatus dot="status-dot online">
            {level} ({value}%)
          </DeviceStatus>
        </div>
      </div>
    </>
  );
}

export default Fan;