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
function DashboardPage(){
    return(
        <>
          <Header>Dashboard</Header>
          <status>
            <GetTemp/>
            <GetHumid/>
            <GetLight/>
            <GetDevice/>
          </status>
          <SecHeader>Devices</SecHeader>
          <device>
            <Door/>
            <Light/>
            <Fan/>
          </device>
        </>
    )
}
export default DashboardPage;