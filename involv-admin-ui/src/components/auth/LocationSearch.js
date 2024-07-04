import { ExclamationCircleIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import Loader from "../../components/shared/loader/Loader";
import { findFlagUrlByCountryName } from "country-flags-svg";

const LocationSearch = ({
  address = "",
  handleChange,
  error,
  name,
  onBlur,
  icon,
  customClass,
  floatingLabel,
}) => {
  const [isErrorShow, setIsErrorShow] = useState(false);

  const getCountryCode = (suggestion) => {
    const countryName = suggestion.terms[suggestion.terms?.length - 1]?.value;
    const result = findFlagUrlByCountryName(countryName);
    return result;
  };

  const handleSelect = (address) => {
    handleChange(address);
    // geocodeByAddress(address)
    //   .then((results) => getLatLng(results[0]))
    //   .then((latLng) => console.log("Success", latLng))
    //   .catch((error) => console.error("Error", error));
  };
  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <div className="  relative rounded-md shadow-sm">
              {icon && (
                <div className="absolute inset-y-0 left-0 pl-3  flex items-center pointer-events-none">
                  <img className="w-5 h-5" src={"/images/Country-icon.svg"} />
                </div>
              )}
              <div className="relative rounded">
                <input
                  {...getInputProps({
                    placeholder: `${floatingLabel ? "" : "Location"}`,
                    className: `${
                      "h-12  w-full border border-gray-200  focus:ring-indigo-500 focus:border-indigo-500  rounded bg-transparent text-sm  p-2 " +
                      customClass
                    }`,
                  })}
                  onBlur={onBlur}
                  name={name}
                />
                {floatingLabel && (
                  <label
                    className={[
                      "absolute flex items-center text-gray-800 text-opacity-50 transition-all duration-200 ease-in-out",
                      address
                        ? "text-xs px-2 -top-1 left-2 bg-white"
                        : "text-sm p-2 top-1.5 left-0",
                    ].join(" ")}
                    htmlFor={name}
                  >
                    Location
                  </label>
                )}
              </div>
              {error && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ExclamationCircleIcon
                    className="h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                </div>
              )}
              {address && (
                <div className="shadow rounded z-10 absolute w-full">
                  {loading ? (
                    <div className="flex items-center justify-center p-3">
                      <Loader height={20} width={20} />
                    </div>
                  ) : (
                    <>
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "bg-indigo-50 p-3 cursor-pointer border-b border-gray-200 flex justify-between"
                          : "bg-white p-3 cursor-pointer border-b border-gray-200 flex justify-between";
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                            })}
                            key={suggestion?.index}
                          >
                            <span className="w-85">
                              {suggestion.description}
                            </span>
                            {getCountryCode(suggestion) && (
                              <span className="flex justify-center items-center">
                                <img
                                  src={getCountryCode(suggestion)}
                                  width="20px"
                                  height="40px"
                                />
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              )}
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600" id="location-error">
                {error}
              </p>
            )}
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default LocationSearch;
