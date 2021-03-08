import "./CardsContainer.scss";

import {
  removeCityFromInfoList,
  updateCityWeather,
} from "../../src/store/cityInfoList-reducer";

import CityCard from "../CityCard/CityCard";
import { CityInfoType } from "../types";
import { connect } from "react-redux";

const CardsContainer = (props: any) => {
  const handleDeleteButton = (value: CityInfoType) => {
    props.removeCityFromInfoList(value);
  };

  const handleUpdateButton = (value: CityInfoType) => {
    props.updateCityWeather(value);
  };

  return (
    <div className="cards__container">
      {props.cityInfoList.map((city: CityInfoType) => {
        return (
          <CityCard
            key={city.name}
            city={city}
            handleDeleteButton={handleDeleteButton}
            handleUpdateButton={handleUpdateButton}
          />
        );
      })}
      <button onClick={() => localStorage.clear()}>LS</button>
    </div>
  );
};

let mapStateToProps = (state: {
  cityInfoList: { cityInfoList: CityInfoType[]; cityList: string[] };
}) => {
  return {
    cityInfoList: state.cityInfoList.cityInfoList,
    cityList: state.cityInfoList.cityList,
  };
};

export default connect(mapStateToProps, {
  removeCityFromInfoList,
  updateCityWeather,
})(CardsContainer);
