import { nanoid } from "nanoid"
import Country from "./country";
import '../styles/countries.css'
import { useGlobalContext } from "../context/context"

function Countries() {
  const { countries } = useGlobalContext()
  const countryElements = countries.map(thisCountry => (
    <Country key={nanoid()} country={thisCountry} />
  ))

  return (
    <div className="countries-container">
      {countryElements}
    </div>
  )
}

export default Countries
