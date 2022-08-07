import { FaCheckCircle, FaHeart, FaSkull, FaStethoscope } from "react-icons/fa";

type InfoStatusInterface = {
  data?: {
    TotalConfirmed?: number;
    TotalDeaths?: number;
    TotalRecovered?: number;
    Active?: number;
  };
};

function InfoStatus({ data }: InfoStatusInterface) {
  const activeCases = data?.Active
    ? data?.Active.toLocaleString()
    : data?.TotalConfirmed &&
      data?.TotalDeaths &&
      (data.TotalConfirmed - data.TotalDeaths).toLocaleString();
  return (
    <div className="px-8 py-4">
      <div className="flex items-center justify-center gap-6 flex-wrap">
        <div className="min-w-[270px] p-6 flex items-center bg-sec-blue rounded-main">
          <div className="w-[45px] h-[45px] flex items-center justify-center bg-third-blue rounded-full">
            <FaCheckCircle className="text-lg text-main-blue" />
          </div>
          <div className="ml-5">
            <p className="text-xl text-fourth-blue font-bold">
              {data?.TotalConfirmed?.toLocaleString()}
            </p>
            <p className="font-medium">Confirmed Cases</p>
          </div>
        </div>
        <div className="min-w-[270px] p-6 flex items-center bg-sec-red rounded-main">
          <div className="w-[45px] h-[45px] flex items-center justify-center bg-third-red rounded-full">
            <FaStethoscope className="text-lg text-main-red" />
          </div>
          <div className="ml-5">
            <p className="text-xl text-fourth-red font-bold">{activeCases}</p>
            <p className="font-medium">Active Cases</p>
          </div>
        </div>
        <div className="min-w-[270px] p-6 flex items-center bg-sec-blue rounded-main">
          <div className="w-[45px] h-[45px] flex items-center justify-center bg-third-blue rounded-full">
            <FaHeart className="text-lg text-main-blue" />
          </div>
          <div className="ml-5">
            <p className="text-xl text-fourth-blue font-bold">
              {data?.TotalRecovered?.toLocaleString()}
            </p>
            <p className="font-medium">Recovered Cases</p>
          </div>
        </div>
        <div className="min-w-[270px] p-6 flex items-center bg-fourth-blue rounded-main">
          <div className="w-[45px] h-[45px] flex items-center justify-center bg-[#8B94DE] rounded-full">
            <FaSkull className="text-lg text-white" />
          </div>
          <div className="ml-5">
            <p className="text-xl text-white font-bold">
              {data?.TotalDeaths?.toLocaleString()}
            </p>
            <p className="text-white font-medium">Deaths</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoStatus;
