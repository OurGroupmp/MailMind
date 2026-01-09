import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import aiIcon from "../assets/ai.png";
import emailIcon from "../assets/email.png";
import fingerprintIcon from "../assets/fingerprint.png";


export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-black text-white font-sans overflow-hidden scroll-smooth">
      <Navbar />

      {/* Glow */}
      <div className="absolute inset-0 flex justify-center items-start pt-44 pointer-events-none">
        <div className="w-[420px] h-[420px] bg-emerald-400/20 blur-[90px] rounded-full" />
      </div>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-40">
        <h1 className="text-5xl md:text-6xl font-medium text-gray-400 leading-tight">
          Smarter email categorization,
          <br />
          <span className="text-white font-semibold">
            powered by AI
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-400 max-w-xl">
          MailMind automatically classifies emails using AI and improves accuracy
          through user feedback.
        </p>

        <button
          onClick={() => navigate("/inbox")}
          className="mt-10 px-8 py-4 text-lg font-medium text-emerald-400 border-2 border-emerald-400 rounded-xl hover:bg-emerald-400 hover:text-emerald-950 transition"
        >
          View Inbox
        </button>
      </section>

      {/* FEATURES */}
<section
  id="features"
  className="scroll-mt-28 py-32 px-6 bg-black"
>
  <h2 className="text-4xl font-semibold text-center mb-16">
    Features
  </h2>

  <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
    
    {/* AI Categorization */}
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-emerald-400/40 transition">
      <img
        src={aiIcon}
        alt="AI categorization"
        className="w-12 h-12 mb-6"
      />
      <h3 className="text-xl font-semibold mb-3">
        AI Categorization
      </h3>
      <p className="text-gray-400">
        Automatically classify emails using artificial intelligence.
      </p>
    </div>

    {/* Email Processing */}
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-emerald-400/40 transition">
      <img
        src={emailIcon}
        alt="Email inbox"
        className="w-12 h-12 mb-6"
      />
      <h3 className="text-xl font-semibold mb-3">
        Smart Inbox
      </h3>
      <p className="text-gray-400">
        View, analyze, and manage categorized emails in one place.
      </p>
    </div>

    {/* Human Feedback */}
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-emerald-400/40 transition">
      <img
        src={fingerprintIcon}
        alt="Human feedback"
        className="w-12 h-12 mb-6"
      />
      <h3 className="text-xl font-semibold mb-3">
        Human Feedback
      </h3>
      <p className="text-gray-400">
        Correct AI predictions to improve accuracy over time.
      </p>
    </div>

  </div>
</section>


      {/* HOW IT WORKS */}
      <section
        id="how"
        className="scroll-mt-28 py-32 px-6 bg-black/95"
      >
        <h2 className="text-4xl font-semibold text-center mb-16">
          How It Works
        </h2>

        <div className="max-w-4xl mx-auto space-y-10">
          {[
            "Emails are fetched from a test inbox",
            "AI analyzes and categorizes each email",
            "Users review and correct predictions",
            "System tracks accuracy and performance"
          ].map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-6 bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div className="text-emerald-400 text-xl font-bold">
                {i + 1}
              </div>
              <p className="text-gray-300">
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="scroll-mt-28 py-32 px-6 bg-black"
      >
        <h2 className="text-4xl font-semibold text-center mb-12">
          Contact
        </h2>

        <div className="max-w-xl mx-auto text-center text-gray-400 space-y-6">
          <p>
            Built as an academic demo project for intelligent systems.
          </p>
          <p>
            Email:{" "}
            <span className="text-emerald-400">
              mailmind.demo@gmail.com
            </span>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-sm text-gray-500 border-t border-white/10">
        © 2026 MailMind. All rights reserved.
      </footer>
    </div>
  );
}
