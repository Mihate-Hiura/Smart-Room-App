import "./DeviceMode.css";

function DeviceMode({icon,content,status,mode}){
    return(
        <>
            <button onClick={mode} class="mode-status">
                <i class={icon}></i>
                {content}: <strong>{status}</strong>
            </button>
        </>
    )
}

export default DeviceMode;