import covidImage from "../../assets/image/CovidImage.png";

function SeeMore() {
  return (
    <div className="w-full h-full md:p-5 px-3 py-5 bg-white rounded-main drop-shadow-main">
      <p className="text-2xl text-fourth-red font-semibold">
        Please protect yourself!
      </p>
      <div className="mt-3">
        <p className="text-main-blue text-lg font-medium">
          Wearing masks, washing hands regularly will reduce the risk of
          infection.
        </p>
        <div className="flex items-center justify-between mt-4">
          <div>
            <a
              href="https://www.who.int/news-room/questions-and-answers/item/coronavirus-disease-covid-19-how-is-it-transmitted"
              rel="noreferrer"
              target="_blank"
              className="px-3 py-1 inline-block text-lg text-main-blue font-medium rounded-main 
              border-2 border-main-blue hover:text-white hover:border-fourth-blue hover:bg-fourth-blue transition-all"
            >
              See more
            </a>
          </div>
          <div>
            <img
              src={covidImage}
              alt="covid"
              className="md:w-[200px] w-[150px] object-cover ml-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeeMore;
