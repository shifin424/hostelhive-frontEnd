import React, { useCallback, useEffect, useMemo, useState} from 'react'
import { adminChartData, adminDashboardApi } from '../../../Services/superAdmin';
import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

function DashBoard() {
  const [chartData, setChartData] = useState(null);
  const [chartCount, setChartCount] = useState([]);

  const headers = useMemo(() => ({
    Authorization: localStorage.getItem("adminToken")
  }), []);


  const fetchChartCount = useCallback(async () => {
    try {
      const response = await adminDashboardApi(headers);
      if (response) {
        setChartCount(response.data);
      } else {
        console.log(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [headers]);

  useEffect(() => {
    fetchChartCount();
  }, [fetchChartCount]);

  const fetchChartData = useCallback(async () => {
    try {
      const response = await adminChartData(headers);
      if (response) {
        console.log(response.data, "this is the response");
        setChartData(response.data);
      } else {
        console.log(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [headers]);

  
  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);


  const { blockedChart, complaintChart, hostelChart, requestChart } = chartData || {};

  const chartDataConfig = {
    labels: hostelChart ? Object.keys(hostelChart[0]?.data ?? 0) : [],
    datasets: [
      {
        label: "Hostels",
        data: hostelChart ? Object.values(hostelChart[0]?.data ?? 0) : [],
        backgroundColor: "rgba(75, 201, 108)",
      },
      {
        label: "Blocked Hostels",
        data: blockedChart ? Object.values(blockedChart[0]?.data ?? 0) : [],
        backgroundColor: "rgba(54, 162, 235)",
      },
      {
        label: "Complaints",
        data: complaintChart ? Object.values(complaintChart[0]?.data ?? 0) : [],
        backgroundColor: "rgba(280, 104, 28)",
      },
      {
        label: "Hostel Requests",
        data: requestChart ? Object.values(requestChart[0]?.data ?? 0) : [],
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

      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20 mt-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="p-4 bg-[#4bc96c] rounded  shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Hostels
            </h2>
            <p className="text-3xl font-bold text-white">{chartCount?.hostelCount}</p>
          </div>
          <div className="p-4 bg-[#36a2eb] rounded shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              blocked Hostels
            </h2>
            <p className="text-3xl font-bold text-white">{chartCount?.blockedCount}</p>
          </div>
          <div className="p-4 bg-[#ff681c] rounded shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
            complaints
            </h2>
            <p className="text-3xl font-bold text-white">{chartCount?.complaintsCount}</p>
          </div>
          <div className="p-4 bg-[#b71777] rounded shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Hostel Requests
            </h2>
            <p className="text-3xl font-bold text-white">{chartCount?.requestCount}</p>
          </div>
        </div>
        </div>



        <div className="chart-container h-96 sm:h-[400px] w-full">
          {chartData ? (
            <Bar data={chartDataConfig} options={chartOptions} />
          ) : (
            <div>Loading chart data...</div>
          )}
        </div>


    </>
  )
}

export default DashBoard
