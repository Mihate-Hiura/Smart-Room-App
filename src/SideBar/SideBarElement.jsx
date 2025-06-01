import { NavLink } from "react-router-dom";
import "./SideBarElement.css"
function SideBarElement({logo,content,to=undefined,onClick=null}){
    const titleBtn = to === "/Account" ? "Account" : content;
    const navItem = (
        <ul className="nav-menu">
            <NavLink 
              to={to}
              className={({ isActive }) => (isActive ? "nav-active" : "nav")}
            >
                <button className="nav-item" onClick={onClick} title={titleBtn}>
                    <i className={logo}></i>
                    <span>{content}</span>
                </button>
            </NavLink>
        </ul>
    );
    return navItem;
}
export default SideBarElement;