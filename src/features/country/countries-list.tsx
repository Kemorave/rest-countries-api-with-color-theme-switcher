import React, { useState } from "react";
import { Countries } from "../../types/country";
import {
  useGetAllCountriesQuery,
  useGetCountriesByRegionQuery,
} from "../../services/restcountries_api";
import { MdKeyboardArrowDown, IoMdSearch } from "react-icons/all";

import CountryCard from "./country-card";
import Dropdown from "../../components/dropdown";
import Loading from "../../components/loading";
import Error from "../../components/error";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { ScrollRestoration } from "react-router-dom";
let isSearching = false;
let regions: string[] = [];
const CountriesList = () => {
  const [seachKey, setSearchKey] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const { isLoading,isFetching, data, error } = useGetAllCountriesQuery(seachKey, {
    skip: isSearching,
  });

  let countries: Countries = data ?? [];
  const notFoundError = (error as FetchBaseQueryError)?.status == 404;
  if ((error || countries?.length <= 0) && !notFoundError&&!(isLoading||isFetching)) return <Error />;
  if (countries.length > 0) {
    if (regionFilter) {
      countries = countries.filter((a) => a.region === regionFilter);
    }

    countries.forEach((country) => {
      if (!regions.includes(country.region)) {
        regions.push(country.region);
      }
    });
  }

  return (
    <div className="flex  h-[100vh]  overflow-auto pt-[6rem] background-element  m-auto flex-col">
       <div className="flex md:px-20 mb-5 md:mb-5 px-5 flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex rounded-md overflow-clip  items-center place-content-stretch element">
          <IoMdSearch
            className={`${
              seachKey && isLoading && "animate-bounce"
            } ml-7 h-6 w-6`}
          />
          <input
            placeholder="Search for a country..."
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            className="input flex-1 md:w-[20rem] w-fill   text-sm ml-2 px-3 py-4  outline-none  border-transparent border-none"
          />
        </div>
        <Dropdown
          className="self-start z-40"
          header={(isOpen) => (
            <div className="flex z-40 cursor-pointer mt-10 md:mt-0 gap-10 px-6 py-4 text-sm rounded-md overflow-clip items-center element">
              <p>{regionFilter ? regionFilter : "Filter by Region"}</p>
              <MdKeyboardArrowDown
                className={`transition-transform ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
          )}
          onSelect={(e) => {
            if (e == "None") setRegionFilter("");
            else setRegionFilter(e);
          }}
          options={regionFilter ? ["None", ...regions] : regions}
        />
      </div>
      {(isLoading||isFetching) ? (
        <Loading shimmer={true} shimmerClassName='m-5
        cursor-pointer overflow-clip w-[18em] h-[18rem] md:mx-7 md:w-[13em] rounded-md' num={3} />
      ) : notFoundError ? (
        <Error error="Nothing found on earth try in another planet" />
      ) : (
        <div className="flex  w-full justify-center items-stretch flex-row flex-wrap  ">
          {countries.map((country) => (
            <CountryCard key={country.name.official} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CountriesList;
