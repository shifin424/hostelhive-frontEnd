import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
import { useSelector } from 'react-redux';
import { globalChartApi, globalDahsboard } from '../../../Services/hostelAdmin';
Chart.register(CategoryScale);

function Globaldashboard() {
  const [chartData, setChartData] = useState(null);
  const [chartCount, setChartCount] = useState([]);
  const hostelId = useSelector(state => state?.adminHostelData?.hostelId);

  const headers = useMemo(() => ({
    Authorization: JSON?.parse(localStorage.getItem("HostelAdminToken"))?.token
  }), []);

  const fetchChartCount = useCallback(async () => {
    try {
      const response = await globalDahsboard(headers, hostelId);
      if (response) {
        console.log(response.data, "this is the response");
        setChartCount(response.data);
      } else {
        console.log(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [headers, hostelId]);

  useEffect(() => {
    fetchChartCount();
  }, [fetchChartCount]);

  const fetchChartData = useCallback(async () => {
    try {
      const response = await globalChartApi(headers, hostelId);
      if (response) {
        console.log(response);
        setChartData(response.data);
      } else {
        console.log(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [headers, hostelId]);

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);
  const { userChart, hostelChart, paymentChart, VacateChart } = chartData || {};

  const chartDataConfig = {
    labels: userChart ? Object.keys(userChart[0]?.data ?? 0) : [],
    datasets: [
      {
        label: "Vacate",
        data: VacateChart ? Object.values(VacateChart[0]?.data ?? 0) : [],
        backgroundColor: "rgba(280, 104, 28)",
      },
      {
        label: "Hostels",
        data: hostelChart ? Object.values(hostelChart[0]?.data ?? 0) : [],
        backgroundColor: "rgba(54, 162, 235)",
      },
      {
        label: "Students",
        data: userChart ? Object.values(userChart[0]?.data ?? 0) : [],
        backgroundColor: "rgba(75, 201, 108)",
      },
      {
        label: "Payment",
        data: paymentChart ? Object.values(paymentChart[0]?.data ?? 0) : [],
        backgroundColor: "rgba(183, 23, 119)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
      },
    },
  };
  return (
    <>
    
    
    <div className="flex justify-between p-3 ">
        <h1 className="flex text-2xl text-[#002D74] font-bold text-center">DashBoard</h1>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="p-4 bg-[#4bc96c] rounded  shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Users
            </h2>
            <p className="text-3xl font-bold text-white">{chartCount.studentCount}</p>
          </div>
          <div className="p-4 bg-[#36a2eb] rounded shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Hostels
            </h2>
            <p className="text-3xl font-bold text-white">{chartCount.hostelCount}</p>
          </div>
          <div className="p-4 bg-[#ff681c] rounded shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Vacates
            </h2>
            <p className="text-3xl font-bold text-white">{chartCount.vacateCount}</p>
          </div>
          <div className="p-4 bg-[#b71777] rounded shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
             Revenues
            </h2>
            <p className="text-3xl font-bold text-white">{chartCount.paymentCount}</p>
          </div>
        </div>

        <div className="chart-container h-96 sm:h-[400px] w-full">
          {chartData ? (
            <Bar data={chartDataConfig} options={chartOptions} />
          ) : (
            <div>Loading chart data...</div>
          )}
        </div>
      </div>

      </>

  )
}

export default Globaldashboard
