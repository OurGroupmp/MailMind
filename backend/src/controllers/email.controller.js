import Email from "../models/Email.js";

export const getAllEmails = async (req, res) => {
  try {
    const emails = await Email.find().sort({ receivedAt: -1 });

    res.status(200).json(emails);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch emails",
      error: error.message,
    });
  }
};
