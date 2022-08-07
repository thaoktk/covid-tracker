import { useState } from "react";
import { FaVirus } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

const navPath = [
  {
    name: "World",
    path: "/",
  },
  {
    name: "Search",
    path: "/search",
  },
];

function Header() {
  const [showNavMobile, setShowNavMobile] = useState(false);
  const location = useLocation();

  return (
    <div className="md:px-8 px-5 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <FaVirus className="md:text-6xl text-5xl text-main-blue mr-4" />
        <span className="md:text-3xl text-2xl text-main-blue font-bold">Covid Tracker</span>
      </div>
      <div className="hidden lg:flex items-center justify-between gap-6">
        {navPath.map((item, index) => {
          return (
            <div key={index}>
              <Link
                to={item.path}
                className={`${
                  item.path === location.pathname ? "text-main-blue" : ""
                } text-xl font-semibold hover:text-fourth-blue transition-all`}
              >
                {item.name}
              </Link>
            </div>
          );
        })}
      </div>
      <div className="lg:hidden relative">
        <div className="p-3" onClick={() => setShowNavMobile(!showNavMobile)}>
          <BiMenu className="text-2xl font-medium"/>
        </div>
        {showNavMobile && (
          <div className="absolute top-full right-0 z-20 px-11 py-3 bg-white rounded-main drop-shadow-main">
            {navPath.map((item, index) => {
              return (
                <div key={index} className="py-2">
                  <Link
                    to={item.path}
                    className={`${
                      item.path === location.pathname ? "text-main-blue" : ""
                    } text-xl font-semibold hover:text-fourth-blue transition-all`}
                  >
                    {item.name}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
