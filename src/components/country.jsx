import React from "react";
import { Link } from "react-router-dom"
import { useGlobalContext } from "../context/context";

function Country({ country }) {
  const { lightOrDark } = useGlobalContext()
  const {
    flags,
    name,
    population,
    continents,
    capital
  } = country

  return (
    <Link to={`/${name?.common}`}
      className={`route-link ${lightOrDark}`}>
      <div className={`country`}>
        <img src={flags?.png} alt="flag"
          className="country-flag" />
        <div className={`country-details`}>
          <h3>{name?.common}</h3>
          <p>Population:
            <span className="country-stats"> {population}</span>
          </p>
          <p>Region:
            <span className="country-stats">
              {continents?.length ? continents[0] : ""}</span>
          </p>
          <p>Capital:
            <span className="country-stats"> {
              capital?.length ? capital[0] : ""}</span>
          </p>

        </div>
      </div>
    </Link>
  )
}
export default Country
