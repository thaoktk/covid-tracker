import { useEffect, useState } from "react";
import { getAllCountries, getByCountry } from "../../actions";
import LineChart from "../../components/LineChart";
import Header from "../../components/Header";
import InfoStatus from "../../components/InfoStatus";
import InputSearch from "../../components/InputSearch";

export interface CountryInterface {
  Country: string;
  Slug: string;
}

interface CountrySelected {
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: string;
}

function Search() {
  const [countries, setCountries] = useState<CountryInterface[] | undefined>();
  const [countrySelected, setCountrySelected] = useState("vietnam");
  const [dataOfCountrySelected, setDataOfCountrySelected] = useState<
    CountrySelected[] | undefined
  >();
  const [statusChart, setStatusChart] = useState("All");

  const getSearchValue = (value: string) => {
    setCountrySelected(value);
    setStatusChart("All");
  };

  useEffect(() => {
    getAllCountries().then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    getByCountry(countrySelected).then((data) =>
      setDataOfCountrySelected(data)
    );
  }, [countrySelected]);

  const lastValue = dataOfCountrySelected?.slice(-1)[0];

  const dataInfoStatus = {
    TotalConfirmed: lastValue?.Confirmed,
    TotalDeaths: lastValue?.Deaths,
    TotalRecovered: lastValue?.Recovered,
    Active: lastValue?.Active,
  };

  let dataChart = dataOfCountrySelected?.map((value) => {
    return {
      Date: value.Date,
      Confirmed: value.Confirmed,
    };
  });

  if (statusChart === "Weekly") {
    dataChart = dataChart?.slice(-7);
  } else if (statusChart === "Monthly") {
    dataChart = dataChart?.slice(-30);
  }

  const titleOfChartSearch = {
    country: countrySelected,
    status: statusChart,
  };

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-screen-xl min-h-screen w-full h-full">
        <Header />
        <InputSearch onSubmitValue={getSearchValue} listCountries={countries} />
        <div className="my-3 flex items-center justify-center">
          <p className="text-3xl text-fourth-red font-bold">
            {countrySelected.toUpperCase()}
          </p>
        </div>
        <div className="px-8 py-5 grid grid-cols-6">
          <div className="lg:col-span-4 col-span-6">
            <div className="w-full h-full md:p-8 p-5 bg-white rounded-main drop-shadow-main canvas-container">
              <div className="flex items-center justify-end gap-6 mb-4">
                {["All", "Monthly", "Weekly"].map((item, idx) => {
                  return (
                    <div key={idx} onClick={() => setStatusChart(item)}>
                      <button
                        className={`${
                          item === statusChart ? "text-main-blue" : ""
                        } text-lg hover:text-fourth-blue font-semibold transition-all`}
                      >
                        {item}
                      </button>
                    </div>
                  );
                })}
              </div>
              <LineChart
                dataSearch={dataChart}
                titleSearch={titleOfChartSearch}
              />
            </div>
          </div>
          <div className="lg:col-span-2 col-span-6 lg:ml-8 mt-8 lg:mt-0">
            <InfoStatus data={dataInfoStatus} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
