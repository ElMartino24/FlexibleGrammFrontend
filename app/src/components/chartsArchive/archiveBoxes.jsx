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
        </div>
      </Link>
    </div>
  );
}

export default ArchiveBoxes;
