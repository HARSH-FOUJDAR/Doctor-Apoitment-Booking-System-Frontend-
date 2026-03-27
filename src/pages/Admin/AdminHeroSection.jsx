import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

const AdminHeroSection = () => {
  const generalData = {
    labels: ["Doctors", "Patients", "Appointments"],
    datasets: [
      {
        label: "Current Status",
        data: [10, 50, 30],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(245, 158, 11, 0.8)",
        ],
        borderColor: ["#2563eb", "#dc2626", "#d97706"],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Walk-in Patients",
        data: [120, 150, 250, 220, 180, 250, 210],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        borderWidth: 2.3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#2563eb",
      },
      {
        label: "Online Appointments",
        data: [80, 110, 140, 130, 170, 160, 200],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#10b981",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  return (
    <>
    <section>
      <div className="w-full max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chart Card 1: Line (Spans 2 columns on desktop for better readability) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 h-[400px] flex flex-col md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Patient & Appointment Trends
            </h3>
            <div className="flex-grow relative">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>

          {/* Chart Card 2: Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 h-[350px] flex flex-col">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Total Figures
            </h3>
            <div className="flex-grow relative">
              <Bar data={generalData} options={chartOptions} />
            </div>
          </div>

          {/* Chart Card 3: Doughnut */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 h-[350px] flex flex-col">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Distribution
            </h3>
            <div className="flex-grow relative">
              <Doughnut data={generalData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </section>

    </>
  );
};

export default AdminHeroSection;
