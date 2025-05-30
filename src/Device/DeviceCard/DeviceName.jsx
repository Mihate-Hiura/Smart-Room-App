import "./DeviceName.css";

function DeviceName({icon,children}){
    return(
        <>
            <div className="device-name">
                <i className={icon}></i>
                {children}
            </div>
        </>
    )
}

export default DeviceName;
