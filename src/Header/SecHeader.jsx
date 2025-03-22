import "./SecHeader.css";

function SecHeader({children}){
    return(
        <>
            <div class="section-header">
              <h3>{children}</h3>
            </div>
        </>
    )
}

export default SecHeader;