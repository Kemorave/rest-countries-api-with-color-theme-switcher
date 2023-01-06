import React from "react";
import { Country } from "../../types/country";
import {useNavigate } from 'react-router-dom';
const CountryCard = (props: { country: Country }) => {
  const navigation = useNavigate();
  return ( 
     <div onClick={()=>{
      navigation(`/${props.country.name.official}/`,{});
     }} className="element m-5 transition-transform   scale-100 hover:scale-105
     cursor-pointer overflow-clip w-[18em] md:mx-7 md:w-[13em] rounded-md ">
      <img className="h-[10rem] w-full object-cover" src={props.country.flags.svg} />
     <div className="p-5 flex flex-col gap-1">
     <p className="font-bold mb-2">{props.country.name.official}</p>
      <p><span className="font-medium">Population: </span>{props.country.population}</p>
      <p><span className="font-medium">Region: </span>{props.country.region}</p>
      <p><span className="font-medium">Capital: </span>{props.country.capital}</p>
     </div>
   </div>
  );
};

export default CountryCard;
