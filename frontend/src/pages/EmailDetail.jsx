import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CategoryBadge from "../components/CategoryBadge";
import {
  fetchEmailById,
  updateEmailCategory,
} from "../api/api";

const CATEGORIES = ["Work", "Personal", "Promotions", "Spam"];

export default function EmailDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);

  useEffect(() => {
    fetchEmailById(id).then((data) => {
      setEmail(data);
      setLoading(false);
    });
  }, [id]);

  const handleConfirm = async () => {
    const res = await updateEmailCategory(id, email.aiCategory);
    setEmail(res.email);
  };

  const handleChangeCategory = async (category) => {
    const res = await updateEmailCategory(id, category);
    setEmail(res.email);
    setShowCategoryOptions(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="pt-32 text-center text-gray-400">
          Loading email...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      <div className="pt-32 px-6 max-w-4xl mx-auto">
        {/* 🔙 Go Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-2"
        >
          ← Go back
        </button>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">
              {email.subject}
            </h1>
            <CategoryBadge category={email.userCategory || email.aiCategory}/>
          </div>

          <p className="text-gray-400 mb-6">
            From: {email.from}
          </p>

          <div className="text-gray-300 leading-relaxed mb-8">
            {email.body}
          </div>

          {/* Feedback */}
          <div className="border-t border-white/10 pt-6">
            <p className="text-sm text-gray-400 mb-3">
              Is this category correct?
            </p>

            {!showCategoryOptions ? (
              <div className="flex gap-4">
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-emerald-400 text-emerald-950 rounded-lg font-medium hover:bg-emerald-300 transition"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowCategoryOptions(true)}
                  className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/5 transition"
                >
                  Change Category
                </button>
              </div>
            ) : (
              <div className="flex gap-3 flex-wrap">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleChangeCategory(cat)}
                    className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {email.userCategory && (
              <p className="mt-4 text-sm text-gray-400">
                User {email.isCorrect ? "confirmed" : "changed"}:{" "}
                <span className="text-white">
                  {email.userCategory}
                </span>{" "}
                (
                {email.isCorrect ? (
                  <span className="text-emerald-400">Correct</span>
                ) : (
                  <span className="text-red-400">Incorrect</span>
                )}
                )
              </p>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}