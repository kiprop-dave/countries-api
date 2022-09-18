import React, {useContext} from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/details.css"
import { Context } from "../context/context";
import lightIcon from "../assets/icons/back-light.png"
import darkIcon from "../assets/icons/back-dark.png"
import testData from "../country"

export default function CountryDetails(){
    const {isLightMode, lightOrDark, dataCopy} = useContext(Context)

    const {country: countryName} = useParams()
    
    const countryDetail = dataCopy?.find(country => country.name.common === countryName)
    const {flags,
        name,
        population,
        region,
        subregion,
        capital,
        borders,
        currencies,
        languages,
        tld
    } = countryDetail

    const topDomain =() =>{
        if(tld !== undefined){
            return tld[0];
        }else{
            return '';
        }
    }
    
    function getNativeName(obj){
        const firstProp = obj[Object.keys(obj)[0]];
        return firstProp?.common 
    }

    function getCurrency(obj){
        const firstProp = obj[Object.keys(obj)[0]];
        return firstProp?.name 
    }

    function getLanguages(obj){
        const languageProps = Object.keys(obj)
        return languageProps?.map(key =>{
            return obj[key]
        })
    }
    const  getBorders = () =>{
        if(borders !== undefined){
            const borderCountries = borders?.map(bord =>{
                const borderCountry = dataCopy?.find(item => (item.cioc === bord || item.fifa == bord || item.cca3 == bord))
                return borderCountry
            })
            return borderCountries
        }else{
            return undefined
        }
    }
    

    const borderElements = () =>{
        if(getBorders() !== undefined){
            return getBorders().map((thisCountry,index) => (
                <Link to={`/countries-api/${thisCountry?.name.common}`}  key={index} 
                className ={`test borders ${lightOrDark}`}>
                    <div className="last">{thisCountry?.name.common}</div>
                </Link>
            ))
        }else{
            return <span className="test"> No borders</span>
        }
    } 

    const languageElements =() =>{
        if(languages !==undefined){
            return getLanguages(languages)?.map((thisLanguage,index) =>{
                return(
                    <span key={index} className ="test">{thisLanguage},</span>
                )
            })
        }else{
            return ""
        }
    }
    
    const currency =() =>{
        if(currencies !== undefined){
            return getCurrency(currencies)
        }else{
            return ""
        }
    }
    
    const nativeName =() =>{
        if(name.nativeName !== undefined){
            return getNativeName(name.nativeName)
        }else{
            return ""
        }
    }

    const capitalCity =() =>{
        if(capital !==undefined && capital.length > 0){
            return capital[0]
        }else{
            return ""
        }
    }
    
    return(
        <div className={`countrydetails-page`}>
            <Link to={`/countries-api/`} 
            className={`back-button ${lightOrDark}`}>
                {
                    isLightMode ? 
                    <img src={lightIcon} alt="back" /> :
                    <img src={darkIcon} alt="back" />
                }
                <span>Back</span>
            </Link>
            <div className={`countrydetails-container`}>
                <img src={flags.png} alt=""className="details-flag" />
                <div className={`countrydetails-stats`}>
                    <div className="stats-column1">
                        <h1>{name?.common}</h1>
                        <h4>
                            Native Name: 
                            <span className="test"> {nativeName()}</span> <br />
                            Population: 
                            <span className="test"> {population}</span> <br />
                            Region:
                            <span className="test"> {region}</span> <br />
                            Subregion:
                            <span className="test"> {subregion}</span> <br />
                            Capital:
                            <span className="test"> {capitalCity()}</span> <br />
                        </h4>
                    </div>
                    <div className="stats-column2">
                        <h4>
                            Top Level Domain:
                            <span className="test"> {topDomain()}</span> <br />
                            Currency:
                            <span className="test"> {currency()}</span> <br />
                            Languages:
                            {languageElements()}
                        </h4>
                    </div>
                    <div className="stats-column3">
                        <h4>Border Countries: </h4>
                        <div className="borders-container">
                            {borderElements()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}