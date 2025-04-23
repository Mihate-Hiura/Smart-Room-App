import { NavLink } from "react-router-dom";
import "./SideBarElement.css"
function SideBarElement({logo,content,to,onClick=null}){
    return(
        <>
            <ul class="nav-menu">
                <NavLink to={to}>
                    <a href="#" class="nav-item" onClick={onClick}>
                        <i class={logo}></i>
                        <span>{content}</span>
                    </a>
                </NavLink>
            </ul>
        </>
    )
}
export default SideBarElement;