import "./Header.css";
import {useState, useEffect} from "react";
function Header({children}){
    const [greeting, setGreeting] = useState('');
    useEffect(() => {
        handleGreeting();
    }, []);
    function handleGreeting(){
        const time = new Date();
        if(time.getHours() >= 6 && time.getHours() <= 12){
          setGreeting("Good Morning");
        }
        else if(time.getHours() > 12 && time.getHours() < 18){
          setGreeting("Good Afternoon");
        }
        else{
          setGreeting("Good Evening");
        }
    }
    
    return(
        <>
            <header>
                <h2>{children}</h2>
                <div class="user-info">
                    <div>{greeting}, Kent !</div>
                    <i class="fa-solid fa-circle-user"></i>
                </div>
            </header>
        </>
    )
}
export default Header;