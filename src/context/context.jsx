import React ,{ useState } from "react";
import { useEffect } from "react";


const Context = React.createContext()
import axios from "axios";

let isFirst = true

function ContextProvider(props){

    const [apiData, setApiData] = useState([])
    const [dataCopy, setDataCopy] = useState([])
    const [isLightMode, setIsLightMode] = useState(false)
    const [searchParam, setSearchParam] = useState("")
    const [filterParam, setFilterParam] = useState("")

    //This is a function to toggle between light and dark mode
    function handleToggle(){
        setIsLightMode(prev => !prev)
    }

    const lightOrDark = isLightMode ? "light" : "dark"

    function handleSearch(event){
        const {value} = event.target
        // const cap = value.charAt(0).toUpperCase() + value.slice(0)
        setSearchParam(value)
    }
    
    function handleFilter(event){
        const {value} = event.target
        setFilterParam(value)
    }

    const url = "https://restcountries.com/v3.1/all"
    useEffect(() =>{
        axios.get(url).then((response) => {
            setApiData(response.data);
            setDataCopy(response.data)
          });
    },[])

    useEffect(() => {
        if(isFirst){
          isFirst = false
          return
        }
  
      //your code that you don't want to execute at first render
      if(searchParam.length){
        const cap = searchParam.charAt(0).toUpperCase() + searchParam.slice(1).toLocaleLowerCase()
        const searchResults = dataCopy?.filter(item => item.name.common.slice(0,cap.length) === cap)
            // const {common} = item.name
            // const searchLength = capitalized.length
            // const match = common.slice(0, searchLength - 1)
            // return item.name.common.slice(0, searchLength-1) === capitalized
        // })
        setApiData(searchResults)
      }else{
        setApiData(dataCopy)
      }
    },[searchParam])

    useEffect(() =>{
        if(isFirst){
            isFirst = false
            return
        }
        if(filterParam.length){
            if(filterParam === "All"){
                setApiData(dataCopy)
            }else{
                const searchResults = dataCopy.filter(item => item.region === filterParam)
                setApiData(searchResults)
            }
        }
    },[filterParam])

    return(
        <Context.Provider value={
            {
                apiData,
                isLightMode,
                handleToggle,
                lightOrDark,
                handleSearch,
                searchParam,
                filterParam,
                handleFilter,
                dataCopy
            }}>
            {props.children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}



