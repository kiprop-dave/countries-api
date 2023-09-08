import React from "react";
import '../styles/search.css'
import { useGlobalContext } from "../context/context"
import searchLight from "../assets/icons/search-light.png"
import searchDark from "../assets/icons/search-dark.png"

function Search() {

  const {
    lightOrDark,
    isLightMode,
    handleSearch,
    handleFilter,
    filterParam,
    searchParam } = useGlobalContext()

  return (
    <div className={`search-container`}>
      <div className={`text-search ${lightOrDark}`}>
        {
          isLightMode ?
            <img src={searchLight} alt="search" /> :
            <img src={searchDark} alt="search" />
        }
        <input
          type="text"
          className={`input ${lightOrDark}`}
          value={searchParam}
          onChange={handleSearch}
          placeholder="Search for a country..."
        />
      </div>
      <div className={`filter--search ${lightOrDark}`}>
        {/* <label htmlFor="filter" className="filter-label"
                >Filter by region...</label> */}

        <select
          id="filter"
          value={filterParam}
          onChange={handleFilter}
          name="filter"
          className={`${lightOrDark} select`}
        >

          <option value="" className="filter-label">
            Filter By Region
          </option>
          <option value="All">All</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Americas">Americas</option>
          <option value="Oceania">Oceania</option>
          <option value="Antarctic">Polar</option>

        </select>
      </div>
    </div>
  )

}

export default Search
