import { useEffect, useMemo, useState } from "react";
import { getAllCountries, getByCountry } from "../../actions";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import InfoStatus from "../../components/InfoStatus";
import InputSearch from "../../components/InputSearch";
import LineChart from "../../components/LineChart";

export type CountryType = {
  Country: string;
  Slug: string;
};

type CountrySelectedType = {
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: string;
};

type ChartType = {
  Date: string;
  Confirmed: number;
};

function Search() {
  const [countries, setCountries] = useState<CountryType[] | undefined>(
    undefined
  );
  const [countrySelected, setCountrySelected] = useState("vietnam");
  const [dataOfCountrySelected, setDataOfCountrySelected] = useState<
    CountrySelectedType[] | undefined
  >(undefined);
  const [statusChart, setStatusChart] = useState("All");
  const [dataChart, setDataChart] = useState<ChartType[] | undefined>(
    undefined
  );

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

  const dataInfoStatus = useMemo(() => {
    const lastValue = dataOfCountrySelected?.slice(-1)[0];
    return {
      TotalConfirmed: lastValue?.Confirmed,
      TotalDeaths: lastValue?.Deaths,
      TotalRecovered: lastValue?.Recovered,
      Active: lastValue?.Active,
    };
  }, [dataOfCountrySelected]);

  const titleOfChartSearch = useMemo(() => {
    return {
      country: countrySelected,
      status: statusChart,
    };
  }, [countrySelected, statusChart]);

  useEffect(() => {
    let customData = dataOfCountrySelected?.map((value) => {
      return {
        Date: value.Date,
        Confirmed: value.Confirmed,
      };
    });
    if (statusChart === "Weekly") {
      customData = customData?.slice(-7);
    } else if (statusChart === "Monthly") {
      customData = customData?.slice(-30);
    }

    setDataChart(customData);
  }, [statusChart, dataOfCountrySelected]);

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-screen-xl min-h-screen w-full h-full">
        <Header />
        <InputSearch onSubmitValue={getSearchValue} listCountries={countries} />
        <div className="my-3 flex items-center justify-center">
          <h1 className="text-3xl text-fourth-red font-bold">
            {countrySelected.toUpperCase()}
          </h1>
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
        <Footer />
      </div>
    </div>
  );
}

export default Search;
