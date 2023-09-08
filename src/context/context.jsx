import React, { useMemo, useState, useContext, useEffect } from "react";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";
const Context = React.createContext()

function ContextProvider(props) {

  const [apiData, setApiData] = useState([])
  const [loading, setLoading] = useState(true)
  const [isLightMode, setIsLightMode] = useState(false)
  const [searchParam, setSearchParam] = useState("")
  const [filterParam, setFilterParam] = useState("All")
  const debouncedSearchTerm = useDebounce(searchParam);

  //This is a function to toggle between light and dark mode
  function handleToggle() {
    setIsLightMode(prev => !prev)
  }

  const countries = useMemo(() => {
    return apiData.filter((country) => {
      const belongsToRegion = filterParam === "All" || country.region === filterParam;
      const includesSearch = debouncedSearchTerm.length > 0 ? country.name.common.toLocaleLowerCase().includes(debouncedSearchTerm.toLocaleLowerCase()) : true;
      if (belongsToRegion && includesSearch) {
        return true;
      }
      return false;
    })
  }, [searchParam, filterParam, apiData])

  const lightOrDark = useMemo(() => {
    return isLightMode ? "light" : "dark"
  }, [isLightMode])

  function handleSearch(event) {
    const { value } = event.target
    setSearchParam(value)
  }

  function handleFilter(event) {
    const { value } = event.target
    setFilterParam(value)
  }

  const url = "https://restcountries.com/v3.1/all"
  useEffect(() => {
    setLoading(true)
    axios.get(url).then((response) => {
      setApiData(response.data);
    }).finally(() => {
      setLoading(false)
    });
  }, [])

  const values = {
    apiData,
    isLightMode,
    handleToggle,
    lightOrDark,
    handleSearch,
    searchParam,
    filterParam,
    handleFilter,
    countries,
    loading
  }

  return (
    <Context.Provider value={values}>
      {props.children}
    </Context.Provider>
  )
}

const useGlobalContext = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error("useGlobalContext must be used within a ContextProvider")
  }
  return context
}

export { ContextProvider, useGlobalContext }



