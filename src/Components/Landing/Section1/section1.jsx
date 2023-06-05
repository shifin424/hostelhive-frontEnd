import React from "react";

function section1() {
  return (
    // <div className="bg-emerald-500 w-full h-[50rem] md:h-[55rem] flex flex-wrap">
    //   <div className="bg-slate-400 w-full h-1/2 flex md:flex md: justify-center  sm:bg-red-300 md:bg-blue-900">
    //     <img
    //       className="w-80 h-[20rem] rounded-md mt-24 md:absolute md:right-6 md:h-80 md:w-[30rem] "
    //       src={require("../../../assets/images/2-bed-pic.jpg")}
    //       alt="logo"
    //     />
    //   </div>
    //   <div className="bg-blue-900 w-full h-1/2 flex justify-center">
    //     <div className="w-80 text-center">
    //       <p>
    //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,
    //         quibusdam.
    //       </p>
    //     </div>
    //   </div>
    // </div>

    <div className="w-full bg-white h-max pb-10 pt-5">
       <div className="w-full flex flex-col-reverse md:flex h-96 bg-white items-center">
          <div className="w-1/2 md:w-1/2 h-full bg-white md:absolute md:left-1 md:h-96  flex items-center justify-center ">
            <div className=" bg-white mr-32 text-center text-2xl w-[29rem]">
            <p className="text-[#002D7A] font-popins ">"Stay Smart, Travel Free - Welcome to Our Hostel Network - Where Affordable Dreams Become Reality"</p>
              <p className="text-[#002D7A] text-2xl font-bold mt-5">- Hostel Hive -</p>
              <button className="btn bg-[#002D7A] hover:bg-blue-500 hover:text-black text-white mt-8">Add Your Property</button>
            </div>
            
           </div>
         
          <div className="w-1/2 h-1/2 md:w-[55rem] md:absolute right-10 bg-white">
             <img className="object-cover w-full rounded-lg h-full"
              src={require("../../../assets/images/2-bed-pic.jpg")} alt="" />
          </div>
       </div>
    </div>
  );
}

export default section1;
