import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import emailRoutes from "./routes/emailroutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import seedEmails from "./services/seedEmails.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",           // local dev
      "https://mail-mind-rust.vercel.app", // deployed frontend
      "https://mail-mind-git-main-mirthipati-megha-vardhans-projects.vercel.app",
      "http://mail-mind-hq31ueev4-mirthipati-megha-vardhans-projects.vercel.app"
    ],
  })
);

app.use(express.json());
app.use("/api/emails", emailRoutes);
app.use("/api/analytics", analyticsRoutes);


const startServer = async () => {
  try {
    await connectDB();         
    await seedEmails();

    app.get("/", (req, res) => {
      res.json({ message: "MailMind backend running 🚀" });
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();