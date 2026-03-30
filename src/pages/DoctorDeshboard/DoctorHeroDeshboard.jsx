import axios from "axios";
import React, { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { toast } from "react-toastify";
// Important: Chart.js requires manual registration of components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
);

const DoctorHeroDeshboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://doctor-apoitment-booking-system.onrender.com/appoitmet/allAppointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.data.success) {
        setAppointments(res.data.appointments || []);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch appointments",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

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
      },
      {
        label: "Online Appointments",
        data: [80, 110, 140, 130, 170, 160, 200],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  const generalData = {
    labels: ["Doctors", "Patients", "Appointments"],
    datasets: [
      {
        data: [10, 50, appointments.length || 30], // Dynamic appointment count
        backgroundColor: ["#3b82f6", "#ef4444", "#f59e0b"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <section className="flex flex-col xl:flex-row gap-6 p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Left Schedule Box */}
      <div className="flex-1 xl:max-w-[50%] border border-gray-200 rounded-2xl p-4 sm:p-6 bg-white shadow-sm h-fit">
        <h2 className="text-xl sm:text-2xl font-bold px-2">Today's Schedule</h2>
        <p className="text-gray-500 mb-6 px-2">
          You have {appointments.length} appointments scheduled
        </p>

        <div className="space-y-4">
          {loading ? (
            <p className="text-center py-10">Loading appointments...</p>
          ) : appointments.length > 0 ? (
            appointments.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border border-gray-100 w-full rounded-xl px-4 py-4 bg-white hover:shadow-md transition-shadow"
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    {item.patient?.name || "Unknown Patient"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.slotTime || item.time || "No time set"}
                  </p>
                  <p className="text-xs font-medium text-blue-600 uppercase mt-1">
                    {item.amount ? "Paid" : "Online"}
                  </p>
                </div>

                <div className="flex gap-4">
                  <button className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm transition-colors">
                    Confirm
                  </button>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors">
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 py-10">
              No appointments found.
            </p>
          )}
        </div>
      </div>

      {/* Right Charts Box */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 h-[350px] flex flex-col">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Patient Trends
          </h3>
          <div className="flex-grow">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 h-[350px] flex flex-col">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Distribution
          </h3>
          <div className="flex-grow">
            <Doughnut data={generalData} options={chartOptions} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorHeroDeshboard;
