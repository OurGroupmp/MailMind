import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { fetchAnalytics } from "../api/api";

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const data = await fetchAnalytics();
        setStats(data);
      } catch (error) {
        console.error("Analytics fetch failed:", error.message);
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="pt-40 text-center text-gray-400">
          Loading analytics…
        </div>
      </div>
    );
  }

  const { totalEmails, correct, incorrect, accuracy } = stats;
  // Ring math
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (accuracy / 100) * circumference;

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      <div className="pt-32 px-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-semibold mb-3">Analytics</h1>
          <p className="text-gray-400">
            Performance of AI-powered email categorization system.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Total Emails */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <div className="text-gray-400 mb-4 text-sm">
              📩 Total Emails
            </div>
            <div className="text-5xl font-semibold">
              {totalEmails}
            </div>
          </div>

          {/* Correct */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <div className="text-emerald-400 mb-4 text-sm">
              ✔ Correct Predictions
            </div>
            <div className="text-5xl font-semibold text-emerald-400">
              {correct}
            </div>
          </div>

          {/* Incorrect */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <div className="text-red-400 mb-4 text-sm">
              ✖ Incorrect Predictions
            </div>
            <div className="text-5xl font-semibold text-red-400">
              {incorrect}
            </div>
          </div>

          {/* Accuracy Ring */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center">
            <svg width="180" height="180">
              <circle
                cx="90"
                cy="90"
                r={radius}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="90"
                cy="90"
                r={radius}
                stroke="#34d399"
                strokeWidth="10"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 90 90)"
                className="transition-all duration-1000"
              />
              <text
                x="50%"
                y="45%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-white text-3xl font-bold"
              >
                {accuracy}%
              </text>
              <text
                x="50%"
                y="58%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-gray-400 text-sm"
              >
                Accuracy
              </text>
            </svg>
          </div>

        </div>
      </div>
    </div>
  );
}
