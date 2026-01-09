import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CategoryBadge from "../components/CategoryBadge";
import { fetchEmails, fetchAnalytics } from "../api/api";

export default function Inbox() {
  const navigate = useNavigate();

  const [emails, setEmails] = useState([]);
  const [stats, setStats] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchEmails(), fetchAnalytics()]).then(
      ([emailsData, analyticsData]) => {
        setEmails(emailsData);
        setStats(analyticsData);
        setLoading(false);
      }
    );
  }, []);

  const filteredEmails = emails.filter((email) => {
    const matchesFilter =
      activeFilter === "All" || email.aiCategory === activeFilter;

    const text = `${email.from} ${email.subject} ${email.body}`.toLowerCase();
    const matchesSearch = text.includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Accuracy Ring Logic (REAL DATA)
  const accuracy = stats?.accuracy ?? 0;
  const correct = stats?.correct ?? 0;
  const incorrect = stats?.incorrect ?? 0;

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (accuracy / 100) * circumference;

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      <div className="pt-32 px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* LEFT: Inbox */}
        <div className="lg:col-span-3">
          <h1 className="text-3xl font-semibold mb-2">
            Smarter Email Inbox
          </h1>
          <p className="text-gray-400 mb-6">
            AI-powered email categorization that learns from your feedback.
          </p>

          {/* Filters + Search */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-6 text-sm text-gray-400">
              {["All", "Work", "Personal", "Promotions", "Spam"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`pb-2 transition ${
                    activeFilter === tab
                      ? "text-white border-b-2 border-emerald-400"
                      : "hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Search emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 outline-none"
            />
          </div>

          {/* Email List */}
          <div className="space-y-4">
            {loading ? (
              <p className="text-gray-400">Loading emails...</p>
            ) : filteredEmails.length === 0 ? (
              <p className="text-gray-400">No emails found.</p>
            ) : (
              filteredEmails.map((email) => (
                <div
                  key={email._id}
                  onClick={() => navigate(`/email/${email._id}`)}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-emerald-400/40 transition cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{email.from}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(email.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{email.subject}</h3>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                        {email.body}
                      </p>
                    </div>
                    <CategoryBadge category={email.userCategory || email.aiCategory}/>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT: Accuracy */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-fit">
          <h3 className="text-lg font-semibold mb-6">Accuracy</h3>

          <div className="flex justify-center mb-6">
            <svg width="140" height="140">
              <circle
                cx="70"
                cy="70"
                r={radius}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="70"
                cy="70"
                r={radius}
                stroke="#34d399"
                strokeWidth="10"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 70 70)"
                className="transition-all duration-1000"
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-white text-xl font-bold"
              >
                {accuracy}%
              </text>
            </svg>
          </div>

          <div className="text-sm text-gray-400 space-y-2">
            <div className="flex justify-between">
              <span>Correct</span>
              <span className="text-emerald-400">{correct}</span>
            </div>
            <div className="flex justify-between">
              <span>Incorrect</span>
              <span className="text-red-400">{incorrect}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
