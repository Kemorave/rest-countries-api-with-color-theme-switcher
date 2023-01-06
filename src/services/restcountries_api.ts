// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Countries, Country } from "../types/country";

// Define a service using a base URL and expected endpoints
export const countriesApi = createApi({
  reducerPath: "countriesApi",
  // global configuration for the api
  keepUnusedDataFor: 60 * 60,
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1" }),
  endpoints: (builder) => ({
    getAllCountries: builder.query<Countries, string>({
      query: (name) => (name ? `/name/${name}` : `all`),
    }),
    getCountryByName: builder.query<Countries, string>({
      query: (name) => `/name/${name}?fullText=true`,
    }),
    getCountriesByRegion: builder.query<Countries, string>({
      query: (region) => `/region/${region}`,
    }),
    getCountriesByCode: builder.query<Countries, string[]>({
      query: (codes) => `/alpha?codes=${codes.join(",")}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllCountriesQuery,
  useGetCountriesByRegionQuery,
  useGetCountriesByCodeQuery,
  useGetCountryByNameQuery,
} = countriesApi;
