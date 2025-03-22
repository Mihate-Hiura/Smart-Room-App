import "./Button.css";

function Button({icon,children,action,isDisabled}){
    return(
        <>
            <button onClick={action} disabled={isDisabled} class="btn">
                <i class={icon}></i>
                {children}
            </button>
        </>
    )
}

export default Button;