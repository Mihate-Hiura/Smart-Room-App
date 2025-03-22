import "./Status.css"

function Status({type,card,type_icon,icon,value,unit,warning}){
    return(
        <>
            <div class={card}>
                <div class="status-icon">
                    <i class={icon}></i>
                </div>
                <h3><i class={type_icon}></i>{type}</h3>
                <div class="status-value">{value}{unit}</div>
                <div class="status-status">{warning}</div>
            </div>       
        </>
    )
}

export default Status;