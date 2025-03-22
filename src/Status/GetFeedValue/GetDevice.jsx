
import Status from "../Status.jsx";
function GetDevice(){
    //let [device, setDevice] = useState(0);
    // useEffect(()=>{
    //     device+=level===0?-1:0;
    // },[level])
    return(
        <>
            <Status
                type = "Devices"
                card = "status-card text-black"
                type_icon = "fa-solid fa-microchip"
                icon = "fa-solid fa-microchip"
                value= "3/3"
            />
        </>
    )
}

export default GetDevice;