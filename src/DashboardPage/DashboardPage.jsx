import "./DashboardPage.css"
import GetTemp from '../Status/getFeedValue/GetTemp.jsx';
import GetHumid from '../Status/GetFeedValue/GetHumid.jsx';
import GetLight from '../Status/GetFeedValue/GetLight.jsx';
import SecHeader from '../Header/SecHeader.jsx';
import Door from '../Device/Door.jsx';
import Light from '../Device/Light.jsx';
import Fan from '../Device/Fan.jsx';
import Header from "../Header/Header.jsx";
import GetDevice from "../Status/GetFeedValue/GetDevice.jsx";
function DashboardPage({username}){
    return(
        <>
          <section className="dashboard">
            <Header username = {username}>Dashboard</Header>
            <section className="status">
              <GetTemp/>
              <GetHumid/>
              <GetLight/>
              <GetDevice/>
            </section>
            <section className="secheader">
              <SecHeader>Devices</SecHeader>
            </section>
            <section className="device">
              <Door/>
              <Light/>
              <Fan/>
            </section>
          </section>
        </>
    )
}
export default DashboardPage;