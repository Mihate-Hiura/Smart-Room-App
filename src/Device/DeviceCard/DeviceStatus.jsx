import "./DeviceStatus.css";

function DeviceStatus({children,dot}){
    return(
        <>
            <div className="device-status">
                <div className={dot}></div>
                <div className="status-text">{children}</div>
            </div>
        </>
    )
}

export default DeviceStatus;
