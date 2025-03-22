import { NavLink } from "react-router-dom";
import "./SideBarElement.css"
function SideBarElement({logo,content,to}){
    return(
        <>
            <ul class="nav-menu">
                <NavLink to={to}>
                    <a href="#" class="nav-item">
                        <i class={logo}></i>
                        <span>{content}</span>
                    </a>
                </NavLink>
            </ul>
        </>
    )
}
export default SideBarElement;