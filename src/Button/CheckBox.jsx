import "./CheckBox.css";

function CheckBox({action, isChecked}){
    return(
        <>
            <label class="toggle-switch">
                <input type="checkbox" checked={isChecked} onClick = {action}/>
                <span class="toggle-slider"></span>
            </label>
        </>
    )
}

export default CheckBox;