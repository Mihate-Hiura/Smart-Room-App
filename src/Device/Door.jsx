import "./Door.css";
import Button from "../Button/Button";
import DeviceStatus from "./DeviceCard/DeviceStatus";
import DeviceName from "./DeviceCard/DeviceName";
import DeviceMode from "./DeviceCard/DeviceMode";
import "./Device.css";
import doorAPI from "../API/doorAPI";
import { useState, useEffect } from "react";
import faceIdAPI from "../API/faceidAPI";
function Door() {
  const [door, setDoor] = useState("Locked");
  const [isChanging, setIsChanging] = useState(false);
  const [faceId, setFaceId] = useState("On");
  const [faceIdIcon, setFaceIdIcon] = useState("fas fa-user-check icon-blue");
  const handleDoor = async (status) => {
    setDoor(status);
    setIsChanging(true);
    await doorAPI.add({ value: status });
    setIsChanging(false);
  };
  useEffect(() => {
    if(!isChanging){
      const fetchDoor = async () => {
        const doorList = await doorAPI.getAll();
        const faceIdList = await faceIdAPI.getAll()
        setDoor(doorList);
        setFaceId(faceIdList);
      };
      fetchDoor();
      const updateDoor = setInterval(() => {
        fetchDoor();
      }, 2000);
      return () => clearInterval(updateDoor);
    }
  }, [isChanging]);
  useEffect(() => {
    setFaceIdIcon(faceId==="On"?"fas fa-user-check icon-blue":"fa-solid fa-ban icon-red");
  }, [faceId])
  const handleMode = async ()=>{
      setFaceId(faceId==="On"?"Off":"On");
      setFaceIdIcon(faceId==="Off"?"fas fa-user-check icon-blue":"fa-solid fa-ban icon-red");
      setIsChanging(true);
      await faceIdAPI.add({ value: faceId==="On"?"Off":"On" });
      setIsChanging(false);
  }
  return (
    <>
      <div class="device-card">
        <div class="device-header">
          <DeviceName icon="fa-solid fa-door-open">Smart Door</DeviceName>
          <DeviceStatus
            dot={door === "Locked" ? "status-dot offline" : "status-dot online"}
          >
            {door}
          </DeviceStatus>
        </div>
        <div class="face-id">
          <DeviceMode
            icon={faceIdIcon}
            content="Face Recognition"
            status={faceId}
            mode={handleMode}
          />
          <DeviceMode icon="fas fa-shield-alt icon-blue" content="Status" status="Safe"/>
        </div>
        <div class="door-action">
          <Button icon="fa-solid fa-lock" action={() => handleDoor("Locked")} isDisabled={door === "Locked"}>
            Lock the door
          </Button>
          <Button icon="fa-solid fa-lock-open" action={() => handleDoor("Opened")} isDisabled={door === "Opened"}>
            Open the door
          </Button>
        </div>
      </div>
    </>
  );
}

export default Door;
