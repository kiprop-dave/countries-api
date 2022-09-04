import React, {useContext} from "react";
import '../styles/navbar.css'
import {Context} from "../context/context"

function Navbar(){
    const {isLightMode, handleToggle, lightOrDark} = useContext(Context)
    
    //Conditional rendering for light and dark mode

    function toggle (){
        if(isLightMode) {
           return <div className="toggle--light" ></div> 
        }else{
           return <div className="toggle--dark"></div>
        } 
    }

    return(
        <div className={`navbar ${lightOrDark}`}>
            <h2>Where in the World?</h2>
            <div className={`navbar--toggle ${lightOrDark}`}
                onClick={() => handleToggle()}>
                <div className="toggle--left">
                    {isLightMode && <div className="toggle--light" ></div> }
                </div>
                <div className="toggle--right">
                    {!isLightMode && <div className="toggle--dark" ></div> }
                </div>
                <h2 className="mode">
                    {isLightMode ? "Dark": "Light"} Mode
                </h2>
            </div>
        </div>
    )
    
}
export default Navbar