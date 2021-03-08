import "./SearchForm.scss";

import React, { useState } from "react";
import {
  addCityToInfoList,
  getAllCityWeather,
  getCityWeather,
} from "../../src/store/cityInfoList-reducer";
import {
  clearAutocompleteCitiesNames,
  getAutocompleteCitiesNames,
} from "../../src/store/autoComplete-reducer";

import { CityInfoType } from "../types";
import { connect } from "react-redux";

const MIN_SEACRCH_VALUE = 2;

const SearchForm = (props: any) => {
  const [searchTerm, setSearchTerm] = useState("");

  const updateAllCitiesWeather = () => {
    props.getAllCityWeather(props.cityList);
  };

  const getAutocompleteCity = (value: string) => {
    props.getAutocompleteCitiesNames(value);
  };

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    if (searchValue.length > MIN_SEACRCH_VALUE) {
      getAutocompleteCity(event.target.value);
    } else props.clearAutocompleteCitiesNames();
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    props.getCityWeather(searchTerm);
    setSearchTerm("");
    props.clearAutocompleteCitiesNames();
  };

  const handleAutoCompleteClick = (value: string) => {
    const searchCity = value.split(",")[0];
    setSearchTerm("");
    props.clearAutocompleteCitiesNames();
    props.getCityWeather(searchCity);
  };

  return (
    <div className="SearchForm">
      <form onSubmit={handleOnSubmit}>
        <div>
          <label>
            <input
              type="text"
              name="login"
              placeholder="Select city"
              value={searchTerm}
              autoComplete="off"
              onChange={handleOnInputChange}
              className="form__input"
            />
            <div className="autocomplete__fields">
              {props.autoCompleteInfo.map((city: any) => {
                return (
                  <div onClick={() => handleAutoCompleteClick(city)}>
                    {city}
                  </div>
                );
              })}
            </div>
          </label>
        </div>
      </form>
      <button onClick={updateAllCitiesWeather}>UpdateAll</button>
    </div>
  );
};

let mapStateToProps = (state: {
  cityInfoList: { cityInfoList: CityInfoType[]; cityList: string[] };
  autoCompleteInfo: { autoCompleteInfo: string[] };
}) => {
  return {
    cityInfoList: state.cityInfoList.cityInfoList,
    cityList: state.cityInfoList.cityList,
    autoCompleteInfo: state.autoCompleteInfo.autoCompleteInfo,
  };
};

export default connect(mapStateToProps, {
  addCityToInfoList,
  getCityWeather,
  getAllCityWeather,
  getAutocompleteCitiesNames,
  clearAutocompleteCitiesNames,
})(SearchForm);
