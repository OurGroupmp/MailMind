import express from "express";
import Email from "../models/Email.js";

const router = express.Router();

/**
 * GET - Fetch all emails
 */
router.get("/", async (req, res) => {
  try {
    const emails = await Email.find().sort({ createdAt: -1 });
    res.json(emails);
  } catch (error) {
    console.error("Failed to fetch emails:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET - Fetch single email by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);

    if (!email) {
      return res.status(404).json({ message: "Email not found" });
    }

    res.json(email);
  } catch (error) {
    console.error("Failed to fetch email:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * PATCH - User corrects email category
 */
router.patch("/:id/category", async (req, res) => {
  try {
    const { userCategory } = req.body;

    if (!userCategory) {
      return res.status(400).json({
        message: "userCategory is required",
      });
    }

    const email = await Email.findById(req.params.id);

    if (!email) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    email.userCategory = userCategory;
    email.isCorrect = email.aiCategory === userCategory;

    await email.save();

    res.json({
      message: "Category updated successfully",
      email,
    });
  } catch (error) {
    console.error("User correction failed:", error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;
