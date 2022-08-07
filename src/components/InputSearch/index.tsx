import React, { useState } from "react";
import { BiChevronDown, BiSearch } from "react-icons/bi";
import { CountryInterface } from "../../pages/Search";

type InputSearchInterface = {
  onSubmitValue: (value: string) => void;
  listCountries?: CountryInterface[];
};

function InputSearch({ onSubmitValue, listCountries }: InputSearchInterface) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleActiveSearchContent = () => {
    setIsSearching(true);
  };

  const handleToggleSearchContent = () => {
    setIsSearching((prevState) => !prevState);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const arraySearchValue = listCountries
    ?.sort((valueA, valueB) => valueA.Country.localeCompare(valueB.Country))
    .filter((value) => {
      if (searchValue.length <= 0) return value;
      else if (
        value.Country.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return value;
      }
    });

  const handleClickCountry = (e: React.MouseEvent, slug: string) => {
    onSubmitValue(slug);
    setIsSearching(false);
    setSearchValue("");
  };

  return (
    <div className=" w-full px-8 py-5">
      <div className="relative">
        <div className="px-5 py-2 md:w-[500px] w-full flex items-center justify-between bg-white rounded-main drop-shadow-sec">
          <div className="flex items-center w-full">
            <BiSearch className="text-xl text-[#A3A3A3]" />
            <input
              value={searchValue}
              type="text"
              placeholder="Search a country"
              className="ml-4 w-full outline-none"
              onFocus={handleActiveSearchContent}
              onChange={handleChangeInput}
            />
          </div>
          <BiChevronDown
            className="text-2xl"
            onClick={handleToggleSearchContent}
          />
        </div>
        {isSearching && (
          <div className="absolute left-0 z-10 md:w-[500px] w-full bg-white rounded-main drop-shadow-sec search-content">
            {arraySearchValue?.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="px-8 py-2 cursor-pointer"
                  onClick={(e) => handleClickCountry(e, item.Slug)}
                >
                  <div>{item.Country}</div>
                  {idx !== arraySearchValue?.length - 1 && (
                    <div className="border-b mt-2" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default InputSearch;
