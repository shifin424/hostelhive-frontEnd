import React from "react";

function section1() {
  return (
    <div className="bg-emerald-500 w-full h-[50rem] md:h-[55rem] flex flex-wrap">
      <div className="bg-slate-400 w-full h-1/2 flex md:flex md: justify-center  sm:bg-red-300 md:bg-blue-900">
        <img
          className="w-80 h-[20rem] rounded-md mt-24 md:absolute md:right-6 md:h-80 md:w-[30rem] "
          src={require("../../../assets/images/2-bed-pic.jpg")}
          alt="logo"
        />
      </div>
      <div className="bg-blue-900 w-full h-1/2 flex justify-center">
        <div className="w-80 text-center">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,
            quibusdam.
          </p>
        </div>
      </div>
    </div>
  );
}

export default section1;
