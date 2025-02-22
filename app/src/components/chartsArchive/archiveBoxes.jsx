import React from "react";
import { Link } from "react-router-dom";

function ArchiveBoxes() {
  return (
    <div className="container mx-auto px-2 md:px-2 w-[90%] mt-[5%] max-sm:w-[90%]">
      <Link
        to="/chartsArchive/flowCharts"
        className="flex items-center bg-[#F5F5F5] border-2 border-solid border-black hover:bg-[white] rounded-xl p-1 max-lg:p-3 mb-2 cursor-pointer no-underline pl-[5%] mb-[2rem]"
      >
        <div className="flex flex-col">
          <h3 className="font-arial text-black text-1xl sm:text-2xl text-left">
            Flow Charts
          </h3>
          <p className="font-arial text-black text-xs sm:sm text-left">
            Search for Flow Charts
          </p>
        </div>
      </Link>
      <Link
        to="/chartsArchive/BarCharts"
        className="flex items-center bg-[#F5F5F5] border-2 border-solid border-black hover:bg-[white] rounded-xl p-1 max-lg:p-3 mb-2 cursor-pointer no-underline pl-[5%] mb-[2rem]"
      >
        <div className="flex flex-col">
          <h3 className="font-arial text-black text-1xl sm:text-2xl text-left">
            Bar Charts
          </h3>
          <p className="font-arial text-black text-xs sm:sm  text-left">
            Search for Bar Charts
          </p>
        </div>
      </Link>
      <Link
        to="/chartsArchive/ColumnCharts"
        className="flex items-center bg-[#F5F5F5] border-2 border-solid border-black hover:bg-[white] rounded-xl p-1 max-lg:p-3 mb-2 cursor-pointer no-underline pl-[5%] mb-[2rem]"
      >
        <div className="flex flex-col">
          <h3 className="font-arial text-black text-1xl sm:text-2xl text-left">
            Column Charts
          </h3>
          <p className="font-arial text-black text-xs sm:sm  text-left">
            Search for Column Charts
          </p>
        </div>
      </Link>
      <Link
        to="/"
        className="flex items-center bg-[#F5F5F5] border-2 border-solid border-black hover:bg-[white] rounded-xl p-1 max-lg:p-3 mb-2 cursor-pointer no-underline pl-[5%] mb-[2rem]"
      >
        <div className="flex flex-col">
          <h3 className="font-arial text-black text-1xl sm:text-2xl text-left">
            Coming Soon...
          </h3>
          <p className="font-arial text-black text-xs sm:sm  text-left">
            Coming Soon...
          </p>
        </div>
      </Link>
      <Link
        to="/"
        className="flex items-center bg-[#F5F5F5] border-2 border-solid border-black hover:bg-[white] rounded-xl p-1 max-lg:p-3 mb-2 cursor-pointer no-underline pl-[5%] mb-[2rem]"
      >
        <div className="flex flex-col">
          <h3 className="font-arial text-black text-1xl sm:text-2xl text-left">
            News / Announcements
          </h3>
          <p className="font-arial text-black text-xs sm:sm text-left">
            Here you can find all the news.
          </p>
        </div>
      </Link>
      <Link
        to="/"
        className="flex items-center bg-[#F5F5F5] border-2 border-solid border-black hover:bg-[white] rounded-xl p-1 max-lg:p-3 mb-2 cursor-pointer no-underline pl-[5%] mb-[2rem]"
      >
        <div className="flex flex-col">
          <h3 className="font-arial text-black text-1xl sm:text-2xl text-left">
            Suggestions - Critique - Errors
          </h3>
          <p className="font-arial text-black text-xs sm:sm  text-left">
            Please write your (constructive criticism) or improvement
            suggestions here.
          </p>
        </div>
      </Link>
    </div>
  );
}

export default ArchiveBoxes;
