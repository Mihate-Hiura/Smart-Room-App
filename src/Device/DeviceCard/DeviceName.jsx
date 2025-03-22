import "./DeviceName.css";

function DeviceName({icon,children}){
    return(
        <>
            <div class="device-name">
                <i class={icon}></i>
                {children}
            </div>
        </>
    )
}

export default DeviceName;
