import {useContext } from 'react'
import { Context } from './context/context'
import './App.css'
import Navbar from './components/navbar'
import Search from './components/search'
import Countries from './components/countries'
import Loading from './components/loading'
import { useEffect } from 'react'
import CountryDetails from './components/countryDetails'
import {Routes , Route} from "react-router-dom"

function App() {
  const {isLightMode, apiData} = useContext(Context)
  const darkorLightPage = isLightMode ? "light-app" : "dark-app"

  // console.log(apiData)

  useEffect(()  => { //This effect adds a dynamic styling to the body
    document.body.classList.add(darkorLightPage);

    return () => {
        document.body.classList.remove(darkorLightPage);
    };
  },[isLightMode]);
  
  return(
    <div className={`${darkorLightPage} page-app`}>
      <Navbar/>
      <Routes>
        <Route exact path='/countries-api/'
          element =
          {
            <>
              <Search/>
              {
                  apiData.length ?
                  <Countries/> :
                  <Loading/>
                }
              </>
            }/>
          <Route  path='/countries-api/:country' element ={<CountryDetails/>}/>
        </Routes>
    </div>
  )
}
      
export default App
      

// const apiElements = apiData?.map((item, index) =>{
//   return(
//     <pre key={index}>{JSON.stringify(item, null, 2)}</pre>
//   )
// })
// return(
//   <pre>{JSON.stringify(apiData, null, 2)}</pre>
// )