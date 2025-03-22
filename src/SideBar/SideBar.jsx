import "./SideBar.css"
import SideBarElement from "./SideBarElement.jsx";
import logo from "../assets/img/Logo1.png";
import History from "../HistoryPage/HistoryPage.jsx";
function Sidebar(){
    return(
        <>  
            
            <div class="logo">
                <img src={logo} alt="Logo" />
            </div>
            <SideBarElement
                logo = "fas fa-home"
                content="Home"
                to="/"
            />
            <SideBarElement
                logo = "fa-solid fa-table-columns"
                content="Dashboard"
                to="/Dashboard"
            />
            <SideBarElement
                logo = "fa-solid fa-clock-rotate-left"
                content="History"
                to="/History"
            />
            
            
        </>
    )
}

export default Sidebar;