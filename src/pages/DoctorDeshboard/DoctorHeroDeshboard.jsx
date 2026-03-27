import React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
const DoctorHeroDeshboard = () => {
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
  return (
    <section className="flex flex-col xl:flex-row gap-6 p-6 bg-gray-50 min-h-screen">

      <div className="flex-1 xl:max-w-[50%] border border-gray-200 rounded-2xl p-6 bg-white shadow-sm h-fit">
        <h2 className="text-2xl font-bold  px-5 ">Today's Schedule</h2>
        <p className="text-gray-500 mb-4 px-5 ">
          You have 12 appointments scheduled for today
        </p>
        {[
          {
            name: "Emma Thompson",
            time: "09:00 AM • 30 min",
            type: "Check-up",
          },
          {
            name: "Michael Chen",
            time: "10:15 AM • 45 min",
            type: "Follow-up",
          },
          {
            name: "Sophia Rodriguez",
            time: "11:30 AM • 60 min",
            type: "Consultation",
          },
          { name: "James Wilson", time: "01:45 PM • 30 min", type: "Urgent" },
          {
            name: "Olivia Parker",
            time: "03:00 PM • 45 min",
            type: "Check-up",
          },
        ].map((item, index) => (
          <div key={index} className="py-2 ">
            <div className="flex justify-between items-center gap-4 border border-gray-200 w-full rounded-xl px-5 py-2 bg-white">
              <div>
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">{item.time}</p>
                <p className="text-sm">{item.type}</p>
              </div>

              <div className="flex gap-10">
                <button className="text-blue-500 cursor-pointer hover:text-blue-700 font-medium ">
                  confirmed
                </button>{" "}
                <button className="text-blue-500 cursor-pointer hover:text-blue-700 font-medium ">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-xl p-5">
        <div className="">
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
          </div>
          {/* Chart Card 3: Doughnut */}
          <div className="bg-white rounded-xl mt-5 shadow-sm border border-gray-100 p-5 h-[350px] flex flex-col">
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
  );
};

export default DoctorHeroDeshboard;
