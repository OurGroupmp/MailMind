import { Link } from "react-router-dom";
import emailIcon from "../assets/email.png";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center justify-between px-12 py-5">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={emailIcon} alt="MailMind logo" className="w-6 h-6" />
          <span className="text-white text-xl font-semibold">
            MailMind
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex gap-8 text-sm text-gray-400">
          <a href="/#home" className="hover:text-white">Home</a>
          <a href="/#features" className="hover:text-white">Features</a>
          <a href="/#how" className="hover:text-white">How It Works</a>
          <a href="/#contact" className="hover:text-white">Contact</a>
          <Link to="/analytics" className="hover:text-white"> Analytics</Link>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() =>
              alert("Login is not required for the demo version")
            }
            className="px-4 py-2 text-sm text-gray-200 border border-white/20 rounded-lg hover:bg-white/5"
          >
            Login
          </button>

          {/* ✅ FIXED BUTTON */}
          <Link
            to="/inbox"
            className="px-4 py-2 text-sm font-semibold text-emerald-950 bg-emerald-400 rounded-lg hover:bg-emerald-300"
          >
            Try Demo
          </Link>
        </div>
      </div>
    </nav>
  );
}
