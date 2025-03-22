import {useState, useEffect} from "react";
import lightAPI from '../../API/lightAPI.js';
import Status from "../Status.jsx";
function GetLight(){
    const [light, setLight] = useState(0);
    const [lightIcon, setLightIcon] = useState("");
    const [card, setCard] = useState("");
    const [warn, setWarn] = useState("");
    useEffect(()=>{
        const fetchLight = async () => {
            const lightList = await lightAPI.getAll();
            setLight(lightList);
        }
        fetchLight();
        const updateLight = setInterval(()=>{
            fetchLight();
        },2000);
        return () => clearInterval(updateLight);
    },[])
    useEffect(()=>{
        let light_icon;
        let cardColor;
        let warning;
        if(light > 300 ){
            light_icon = "fa-solid fa-lightbulb";
            cardColor = "status-card text-red";
            warning = "High";
        }
        else if(light >=100 && light <= 300){
            light_icon = "fa-solid fa-lightbulb";
            cardColor = "status-card text-green";
            warning = "Medium";
        }
        else{
            light_icon = "fa-solid fa-lightbulb";
            cardColor = "status-card text-black";
            warning = "Low";
        }
        setLightIcon(light_icon);
        setCard(cardColor);
        setWarn(warning);
    },[light])
    return(
        <>
            <Status
                type = "Light"
                card = {card}
                type_icon = "fa-solid fa-lightbulb"
                icon = {lightIcon}
                value={light}
                unit=" LUX"
                warning = {warn}
            />
        </>
    )
}

export default GetLight;