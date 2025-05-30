import './App.css';
import React, { useState } from "react";
import HistoryPage from './HistoryPage/HistoryPage.jsx';
import HomePage from './HomePage/HomePage.jsx';
import Sidebar from './SideBar/SideBar.jsx';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './DashboardPage/DashboardPage.jsx';
import SignUp from './Authentication/SignUp.jsx';
import LogIn from './Authentication/LogIn.jsx';
import ForgotPssw from './Authentication/ForgotPssw.jsx';
import ResetPssw from './Authentication/ResetPssw.jsx';
import Account  from './Account/Account.jsx';

function App() {
  const [username, setUsername] = useState(getCookie("username"));
  return (
    <div className="container">
      <aside> 
        <Sidebar username={username} handleLogout={() => handleLogout(() => setUsername(null))} />
      </aside>
      <main>
        <Routes>
          <Route path="/Dashboard" Component={() => {return <DashboardPage username={username} />;}} />
          <Route path="/History" Component={HistoryPage}></Route>
          <Route path="/SignUp" Component={SignUp}></Route>
          <Route path="/LogIn" Component={LogIn}></Route>
          <Route path="/ForgotPassword" Component={ForgotPssw}></Route>
          <Route path="/" Component={HomePage}></Route>
          <Route path="/ResetPassword" Component={ResetPssw}></Route>
          <Route path="/HomePage" Component={HomePage}></Route>
          <Route path="/Account" Component={Account}></Route>
        </Routes>   
      </main>        
    </div>
  )
}

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

export const handleLogout = (onLogoutCallback) => {
  if (confirm("Are you sure you want to log out? 😟")) {
    // Clear the username cookie
    document.cookie = "username=; path=/; max-age=0";

    // Execute the callback function if provided
    if (onLogoutCallback) {
      onLogoutCallback();
    }

    // Redirect to the login page
    window.location.href = "/";
  }
};

export default App;
