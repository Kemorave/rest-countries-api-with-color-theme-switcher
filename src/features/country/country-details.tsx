import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/all";
import { useGetCountryByNameQuery } from "../../services/restcountries_api";
import { Country } from "../../types/country";
import BorderCountries from "./border-countries";
import Loading from "../../components/loading";
import Error from "../../components/error";

const CountryDetails = () => {
  const params = useParams();
  const navigation = useNavigate();
  const { isLoading, error, data } = useGetCountryByNameQuery(params.id ?? "");

  if (isLoading) return <Loading/>;
  if (error || !(data?.length ?? 0 > 0)) 
  return <Error/>;
  let country = data?.at(0);
  let codes: string[] = country?.borders ?? [];

  return (
    <div className="flex overflow-auto
     pb-10 flex-col h-[100vh] background-element pt-24">
      <button
        type="button"
        onClick={() => {
          navigation(-1);
        }}
        className="px-7 mb-7 py-2 rounded-sm md:mx-20 mx-5 self-start element "
      >
        <div className="flex gap-2 items-center">
          <BiArrowBack />
          <p>Back</p>
        </div>
      </button> 
      <div className="flex md:mx-20 flex-col md:flex-row
       md:items-center md:justify-center gap-5 md:gap-24 mx-5">
        <img
          className="my-7 element h-[12rem]  md:h-[15rem] object-cover"
          alt={country?.name?.official}
          src={country?.flags?.svg}
        />
        <div className="flex flex-col gap-2">
        <p className="font-bold mb-2 text-lg">{country?.name?.official}</p>
        
         <div className="flex flex-col md:gap-10 md:items-start justify-between md:flex-row">
         <div className="flex flex-col gap-2">
         <p>
            <span className="font-medium">Native Name: </span>
            {
              (Object.values(country?.name.nativeName as any).at(0) as any)
                .common
            }
          </p>

          <p>
            <span className="font-medium">Population: </span>
            {country?.population.toLocaleString(
              undefined, // leave undefined to use the visitor's browser
              // locale or a string like 'en-US' to override it.
              { minimumFractionDigits: 3 }
            )}
          </p>
          <p>
            <span className="font-medium">Region: </span>
            {country?.region}
          </p>
          <p>
            <span className="font-medium">Sub Region: </span>
            {country?.subregion}
          </p>
          <p>
            <span className="font-medium">Capital: </span>
            {country?.capital}
          </p>
         </div>
         <div className="flex flex-col gap-2">
         <p className="mt-6 md:mt-0">
            <span className="font-medium">Top Level Domain: </span>.
            {country?.name?.official.toLowerCase().substring(0, 2)}
          </p>
          <p>
            <span className="font-medium">Currencies: </span>
            {(Object.values(country?.currencies as any).at(0) as any).name}
          </p>
          <p>
            <span className="font-medium">Languages: </span>
            {Object.values(country?.languages as any).join(", ")}
          </p>
         </div>
         </div>
          <p className="font-medium mt-6">Border Countries:</p>
          <BorderCountries codes={codes} />
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
