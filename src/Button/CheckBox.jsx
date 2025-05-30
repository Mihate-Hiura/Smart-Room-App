import "./CheckBox.css";

function CheckBox({action, isChecked}){
    return(
        <>
            <label className="toggle-switch">
                <input type="checkbox" checked={isChecked} onClick = {action}/>
                <span className="toggle-slider"></span>
            </label>
        </>
    )
}

export default CheckBox;