import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const InputSearch = ({ placeholder, search, setSearch }) => {
  return (
    <div className="mt-2">
      <label className="relative block">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            className="h-5 w-5 fill-slate-300 text-gray-400"
            viewBox="0 0 20 20"
          >
            <AiOutlineSearch size={20} />
          </svg>
        </span>
        <input
          className="placeholder:font-light placeholder:text-slate-400 block bg-white w-full border-none rounded-md py-2 pl-9 pr-3 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm"
          placeholder={placeholder}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
    </div>
  );
};

export default InputSearch;
