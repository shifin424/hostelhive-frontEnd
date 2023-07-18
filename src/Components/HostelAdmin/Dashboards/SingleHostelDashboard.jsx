import React, { useEffect, useState } from 'react'
import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";
import { CategoryScale } from 'chart.js';
import { useSelector } from 'react-redux';
import { chartDataApi } from '../../../Services/hostelAdmin';
Chart.register(CategoryScale);

function SingleHostelDashboard() {
  const [chartData, setChartData] = useState(null);
  console.log(chartData);
  const hostelId = useSelector(state => state?.adminHostelData?.hostelId)

  useEffect(() => {
    const headers = {
      Authorization: JSON?.parse(localStorage.getItem("HostelAdminToken"))?.token
    };

    const fetchChartData = async () => {
      try {
        console.log(headers, hostelId);
        const response = await chartDataApi(headers, hostelId);

        if (response) {
          console.log(response);
          setChartData(response.data);
        } else {
          console.log(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchChartData();
  }, []);


  const { userChart, complaintChart, paymentChart,VacateChart } = chartData || {};

  const chartDataConfig = {
    labels: userChart ? Object.keys(userChart[0]?.data ?? 0) : [],
    datasets: [
     
      {
        label: "Vacate",
        data: VacateChart ? Object.values(VacateChart[0]?.data ?? 0) : [],
        backgroundColor: "rgba(280, 104, 28)",
      },
      {
        label: "Complaints",
        data: complaintChart ? Object.values(complaintChart[0]?.data ?? 0) : [],
        backgroundColor: "rgba(54, 162, 235)",
      },
      {
        label: "Students",
        data: userChart ? Object.values(userChart[0]?.data ?? 0) : [],
        backgroundColor: "rgba(250, 104, 17)",
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
        <h1 className="font-bold mt-10 mb-6 text-2xl text-indigo-950">Monthly Data</h1>
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

export default SingleHostelDashboard
