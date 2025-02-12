import React from "react";

import Headerpic from "../../components/pics/flexibleGrammLogo.webp";


function Header() {
  const handleLogoClick = () => {
    window.location.href = "/forum";
  };

  const headerStyle = {
    backgroundImage: `url(${Headerpic})`,
  };

  return (
    <div className="w-full">
      <div
        className="flex items-start justify-start bg-bgImg bg-cover bg-center bg-no-repeat h-[5rem]"
        style={headerStyle}>
        <div
          className="flex sm:flex-row sm:items-center sm:justify-center h-[1%] sm:h-[100] mt-[2%] mb-[7%] cursor-pointer "
          onClick={handleLogoClick}>
          <h1 className="text-[1.8rem] bg-ternary text-white font-rajdhan text-1xl sm:text-3xl p-2 sm:p-4">
            FlexibleGramm
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Header;