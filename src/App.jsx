import './App.css';
import HistoryPage from './HistoryPage/HistoryPage.jsx';
import HomePage from './DashboardPage/DashboardPage.jsx';
import Sidebar from './SideBar/SideBar.jsx';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './DashboardPage/DashboardPage.jsx';

function App() {
  return (
    <>
      <div class="container">
        <sidebar>
          <Sidebar/>
        </sidebar>
        <main>
          
          <Routes>
            <Route path="/Dashboard" Component={DashboardPage} />
            <Route path="/History" Component={HistoryPage}></Route>
          </Routes>
          
        </main>        
      </div>
    </>
  )
}

export default App;
