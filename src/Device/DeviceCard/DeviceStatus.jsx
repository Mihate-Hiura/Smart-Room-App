import "./DeviceStatus.css";

function DeviceStatus({children,dot}){
    return(
        <>
            <div class="device-status">
                <div class={dot}></div>
                <div class="status-text">{children}</div>
            </div>
        </>
    )
}

export default DeviceStatus;
