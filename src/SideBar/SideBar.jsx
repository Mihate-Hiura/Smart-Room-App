import "./SideBar.css"
import SideBarElement from "./SideBarElement.jsx";
import logo from "../assets/img/Logo1.png";
import History from "../HistoryPage/HistoryPage.jsx";
function Sidebar({ username, handleLogout }){
    return(
        <>  
            
            <div className="logo">
                <img src={logo} alt="Logo" />
                <h2>Smart Home</h2>
            </div>
            
            {username && (
                <SideBarElement
                logo = "fas fa-user"
                content={username || ''}
                to="/Account"
                />
            )}
            <SideBarElement 
                logo = "fas fa-home"
                content="Home"
                to="/HomePage"
            />
            {username? (
                <SideBarElement
                logo = "fa-solid fa-table-columns"
                content="Dashboard"
                to="/Dashboard"
            />
            ):null}
            {username?(
                <SideBarElement
                logo = "fa-solid fa-clock-rotate-left"
                content="History"
                to="/History"
            />
            ): null}
            
            {!username ? (
                <SideBarElement
                  logo="fa-solid fa-right-to-bracket"
                  content="Log In"
                  to="/LogIn"
                />
              ) : (
                <SideBarElement
                  logo="fa-solid fa-right-from-bracket"
                  content="Log Out"
                  to="#"
                  onClick={handleLogout} // Call logout function
                />
              )}
        </>
    )
}

export default Sidebar;