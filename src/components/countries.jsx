import React, {useContext} from "react";
import {nanoid} from "nanoid"
import Country from "./country";
import '../styles/countries.css'
import {Context} from "../context/context"
import testData from "../country"

function Countries(){
     const {apiData,isLightMode,lightOrDark} = useContext(Context)
    const countryElements = apiData?.map(thisCountry=>(
        <Country key ={nanoid()} country = {thisCountry}/>
    ))

    return(
        <div className="countries-container">
            {countryElements}
        </div>
    )

}

export default Countries