import "./Button.css";

function Button({icon,children,action,isDisabled}){
    return(
        <>
            <button onClick={action} disabled={isDisabled} className="btn">
                <i className={icon}></i>
                {children}
            </button>
        </>
    )
}

export default Button;