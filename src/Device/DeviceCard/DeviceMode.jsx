import "./DeviceMode.css";

function DeviceMode({icon,content,status,mode}){
    return(
        <>
            <button onClick={mode} className="mode-status">
                <i className={icon}></i>
                {content}: <strong>{status}</strong>
            </button>
        </>
    )
}

export default DeviceMode;