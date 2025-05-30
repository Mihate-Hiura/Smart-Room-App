import "./Status.css"

function Status({type,card,type_icon,icon,value,unit,warning}){
    return(
        <>
            <div className={card}>
                <div className="status-icon">
                    <i className={icon}></i>
                </div>
                <h3><i className={type_icon}></i>{type}</h3>
                <div className="status-value">{value}{unit}</div>
                <div className="status-status">{warning}</div>
            </div>       
        </>
    )
}

export default Status;