
import "./RangeSlide.css";  // Import the CSS file

function RangeSlide({value,action}) {
  return (
    <>
        <div class="range-slide">
            <div class="speed">Speed</div>
            <input type="range" min="0" max="100" value={value} onChange={action} step="20" class="slider" id="myRange"/>
        </div>
        
    </>
  );
}

export default RangeSlide;
