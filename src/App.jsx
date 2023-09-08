import { useGlobalContext } from './context/context'
import './App.css'
import Navbar from './components/navbar'
import Search from './components/search'
import Countries from './components/countries'
import Loading from './components/loading'
import { useEffect } from 'react'
import CountryDetails from './components/countryDetails'
import { Routes, Route } from "react-router-dom"

function App() {
  const { isLightMode, loading } = useGlobalContext()
  const darkorLightPage = isLightMode ? "light-app" : "dark-app"

  useEffect(() => {
    document.body.classList.add(darkorLightPage);

    return () => {
      document.body.classList.remove(darkorLightPage);
    };
  }, [isLightMode]);

  return (
    <div className={`${darkorLightPage} page-app`}>
      <Navbar />
      <Routes>
        <Route exact path='/'
          element=
          {
            <>
              <Search />
              {
                loading ? <Loading /> : <Countries />
              }
            </>
          } />
        <Route path='/:country' element={<CountryDetails />} />
      </Routes>
    </div>
  )
}

export default App
