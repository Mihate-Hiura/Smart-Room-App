import {useState, useEffect} from "react";
import humidAPI from '../../API/humidAPI.js';
import Status from "../Status.jsx";
import toast from "react-hot-toast";
function GetHumid(){
    const [humid, setHumid] = useState(0);
    const [humidIcon, setHumidIcon] = useState("");
    const [card, setCard] = useState("");
    const [warn, setWarn] = useState("");
    useEffect(()=>{
        const fetchHumid = async () => {
            const humidList = await humidAPI.getAll();
            setHumid(humidList);
        }
        fetchHumid();
        const updateHumid = setInterval(()=>{
            fetchHumid();
        },2000);
        return () => clearInterval(updateHumid);
    },[])
    useEffect(()=>{
        let humid_icon;
        let cardColor;
        let warning;
        if(humid > 60 ){
            humid_icon = "fa-solid fa-droplet";
            cardColor = "status-card text-red";
            warning = "High";
            toast(`Humidity is high`)
        }
        else if(humid >= 40 && humid < 60){
            humid_icon = "fa-solid fa-droplet";
            cardColor = "status-card text-green";
            warning = "Perfect";
            toast(`Humidity is perfect`)
        }
        else{
            humid_icon = "fa-solid fa-droplet";
            cardColor = "status-card text-aqua";
            warning = "Low";
            toast(`Humidity is low`)
        }
        setHumidIcon(humid_icon);
        setCard(cardColor);
        setWarn(warning);
    },[humid])
    return(
        <>
            <Status
                type = "Humid"
                card = {card}
                type_icon = "fa-solid fa-droplet"
                icon = {humidIcon}
                value={humid}
                unit="%"
                warning={warn}
            />
        </>
    )
}

export default GetHumid;