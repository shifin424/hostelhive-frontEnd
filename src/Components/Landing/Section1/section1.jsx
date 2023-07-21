import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

function Section1() {
  const [text, setText] = useState("");
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const textToDisplay =
      "Stay Smart, Travel Free - Welcome to Our Hostel Network - Where Affordable Dreams Become Reality";
    let currentIndex = 0;

    const displayText = () => {
      if (currentIndex < textToDisplay.length) {
        setText((prevText) => prevText + textToDisplay[currentIndex]);
        currentIndex++;
        setTimeout(displayText, 80);
      } else {
        setShowButton(true);
      }
    };

    setTimeout(displayText, 1000);
  }, []);


  const hasHostelAdminToken = !!localStorage.getItem("HostelAdminToken");

  const handleButtonClick = () => {
    if (hasHostelAdminToken) {
      navigate("/hostel/add-hostel");
    } else {
      navigate("/hostel/login");
    }
  };

  return (
    <div className="w-full bg-white pb-10 pt-5 mt-10">
      <div className="w-full md:flex h-auto bg-white items-start">
        <div className="md:w-1/2 md:h-96 bg-white md:order-2">
          <img
            className="object-cover w-full rounded-sm h-full"
            src={require("../../../assets/images/2-bed-pic.jpg")}
            alt=""
          />
        </div>

        <div className="md:w-1/2 bg-white md:pl-6 md:order-1">
          <div className="md:flex md:flex-col md:justify-center md:h-full">
            <div className="text-center text-2xl md:mt-10">
              <div>
                <p className="text-[#002D7A] font-popins mt-14">"{text}"</p>
              </div>
              <p className="text-[#002D7A] text-2xl font-bold mt-5">- Hostel Hive -</p>
              {showButton && (
                <button
                  className="btn bg-[#002D7A] hover:bg-blue-500 hover:text-black text-white mt-8"
                  onClick={handleButtonClick}
                >
                  {hasHostelAdminToken ? "Add Your Property" : "Hostel Login"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section1;
