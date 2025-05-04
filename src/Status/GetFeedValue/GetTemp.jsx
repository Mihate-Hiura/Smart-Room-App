import { useState, useEffect } from "react";
import tempAPI from "../../API/tempAPI.js";
import Status from "../Status.jsx";
import toast from "react-hot-toast";
function GetTemp() {
  const [temp, setTemp] = useState(0);
  const [tempIcon, setTempIcon] = useState("");
  const [card, setCard] = useState("");
  const [warn, setWarn] = useState("");
  useEffect(() => {
    const fetchTemp = async () => {
      const tempList = await tempAPI.getAll();
      setTemp(tempList);
    };
    fetchTemp();
    const updateTemp = setInterval(() => {
      fetchTemp();
    }, 2000);
    return () => clearInterval(updateTemp);
  }, []);
  useEffect(() => {
    let temp_icon;
    let cardColor;
    let warning;
    if (temp > 35) {
      temp_icon = "fa-solid fa-temperature-full";
      cardColor = "status-card text-red";
      warning = "Very High";
      toast(`Temperature is too high`);
    } else if (temp >= 30 && temp <= 35) {
      temp_icon = "fa-solid fa-temperature-three-quarters";
      cardColor = "status-card text-orange";
      warning = "High";
      toast(`Temperature is high`);
    } else if (temp >= 22 && temp < 30) {
      temp_icon = "fa-solid fa-temperature-half";
      cardColor = "status-card text-green";
      warning = "Perfect";
      toast(`Temperature is perfect`);
    } else {
      temp_icon = "fa-solid fa-temperature-empty";
      cardColor = "status-card text-aqua";
      warning = "Low";
      toast(`Temperature is low`);
    }
    setTempIcon(temp_icon);
    setCard(cardColor);
    setWarn(warning);
  }, [temp]);
  return (
    <>
      <Status
        type="Temperature"
        card={card}
        type_icon="fa-solid fa-temperature-high"
        icon={tempIcon}
        value={temp}
        unit="°C"
        warning={warn}
      />
    </>
  );
}

export default GetTemp;
