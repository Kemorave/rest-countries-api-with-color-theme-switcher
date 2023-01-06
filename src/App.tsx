import { useContext, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Toggle from "./components/toggle";

import { ThemeContext } from "./contexts/theme-context";
import CountriesList from "./features/country/countries-list";
import CountryDetails from "./features/country/country-details";

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`${theme}`}>
        <nav className="px-5 md:px-20 py-5 fixed w-full  top-0 z-50 transition-colors element">
          <ul className=" flex flex-row  justify-between items-center">
          <Link to='/'>
          <li className="font-semibold whitespace-nowrap text-sm">Where in the world?</li>
          </Link>
            <li>
              <Toggle />
            </li>
          </ul>
        </nav>
       <main>
       <Routes>
          <Route path="/" index element={<CountriesList />} />
          <Route path="/:id" element={<CountryDetails />} />
        </Routes>
       </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
