import { useEffect, useState } from "react";
import { getSummary } from "../../actions";
import LineChart from "../../components/LineChart";
import Header from "../../components/Header";
import InfoStatus from "../../components/InfoStatus";
import SeeMore from "../../components/SeeMore";

type WorldInterface = {
  Global: {
    TotalConfirmed: number;
    TotalDeaths: number;
    TotalRecovered: number;
  };
  Countries: {
    Country: string;
    TotalConfirmed: number;
  }[];
};

function World() {
  const [statusWorld, setStatusWorld] = useState<WorldInterface | undefined>();

  useEffect(() => {
    getSummary()
      .then((data) => setStatusWorld(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-screen-xl min-h-screen w-full h-full">
        <Header />
        <InfoStatus data={statusWorld?.Global} />
        <div className="px-8 py-5 grid grid-cols-6">
          <div className="lg:col-span-4 col-span-6 w-full h-full md:p-8 p-3 bg-white rounded-main drop-shadow-main">
            <LineChart dataWorld={statusWorld?.Countries} />
          </div>
          <div className="lg:col-span-2 col-span-6 lg:ml-8 mt-8 lg:mt-0">
            <SeeMore />
          </div>
        </div>
      </div>
    </div>
  );
}

export default World;
