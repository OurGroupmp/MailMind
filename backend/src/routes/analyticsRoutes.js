import express from "express";
import Email from "../models/Email.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const totalEmails = await Email.countDocuments();

    const correct = await Email.countDocuments({ isCorrect: true });
    const incorrect = await Email.countDocuments({ isCorrect: false });

    const accuracy =
      totalEmails === 0
        ? 0
        : Math.round((correct / totalEmails) * 100);

    res.json({
      totalEmails,
      correct,
      incorrect,
      accuracy,
    });
  } catch (error) {
    console.error("Analytics error:", error.message);
    res.status(500).json({ message: "Analytics fetch failed" });
  }
});

export default router;