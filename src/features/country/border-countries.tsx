import React from "react";

import { useGetCountriesByCodeQuery } from "../../services/restcountries_api";
import { useNavigate } from "react-router-dom";
const BorderCountries = (props: { codes: string[] }) => {
  if (!props.codes || props.codes?.length === 0) {
    return <p>None</p>;
  }
  const { isLoading,isFetching, error, data } = useGetCountriesByCodeQuery(props.codes);
  const navigation = useNavigate();
  if (error) {
    return <p>Error occured ...</p>;
  }
  if (isLoading||isFetching) {
    return <p>Loading borders</p>;
  }
  if (!data || data?.length === 0) {
    return <p>None</p>;
  }
  return (
    <div className="flex pt-2 max-w-[15rem] flex-wrap gap-2">
      {data.map((a, i) => (
        <p
          onClick={() => {
            navigation(`/${a.name.common}`);
          }}
          className="element cursor-pointer transition-transform  hover:scale-105 text-xs px-3 text-center py-1"
          key={`${a.name.common}${i}`}
        >
          {a.name.common}
        </p>
      ))}
    </div>
  );
};

export default BorderCountries;
