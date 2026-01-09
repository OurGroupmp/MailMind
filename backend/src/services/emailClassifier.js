import axios from "axios";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const classifyEmail = async (subject, body) => {
  try {
    const response = await axios.post(
      GEMINI_URL,
      {
        contents: [
          {
            parts: [
              {
                text: `Classify this email into ONE category only:
Work, Personal, Promotions, Spam.

Respond with only the category name.

Subject: ${subject}
Body: ${body}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GEMINI_API_KEY, // 🔑 THIS IS THE KEY FIX
        },
        timeout: 10000,
      }
    );

    const result =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!result) throw new Error("Empty Gemini response");

    return result.trim();
  } catch (error) {
    console.warn(
      "⚠️ Gemini REST failed, using fallback",
      error.response?.data || error.message
    );

    // Fallback (KEEP)
    const text = `${subject} ${body}`.toLowerCase();
    if (text.includes("interview") || text.includes("project")) return "Work";
    if (text.includes("order") || text.includes("sale")) return "Promotions";
    if (text.includes("win") || text.includes("verify")) return "Spam";
    return "Personal";
  }
};

export default classifyEmail;
