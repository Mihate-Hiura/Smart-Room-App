
import "./RangeSlide.css";  // Import the CSS file
import DeviceStatus from "../Device/DeviceCard/DeviceStatus";
function RangeSlide({value,action,status}) {
  return (  
    <>
        <div class="range-slide">
            <div class="speed">Speed</div>
            <input type="range" min="0" max="100" value={value} onChange={action} step="20" class="slider" id="myRange"/>
            <div class="status-slide">
              <DeviceStatus dot="status-dot online">{status}</DeviceStatus>
            </div>    
        </div>
        
    </>
  );
}

export default RangeSlide;
