import Email from "../models/Email.js";
import classifyEmail from "./emailClassifier.js";

const seedEmails = async () => {
  try {
    await Email.deleteMany();

    const emails = [
      {
        messageId: "msg-001",
        from: "hr@company.com",
        subject: "Interview Confirmation",
        body: "Your interview is scheduled for Monday at 10 AM.",
      },
      {
        messageId: "msg-002",
        from: "manager@office.com",
        subject: "Project deadline update",
        body: "The project deadline has been moved to next Friday.",
      },
      {
        messageId: "msg-003",
        from: "noreply@github.com",
        subject: "Pull request review required",
        body: "A pull request requires your review.",
      },
      {
        messageId: "msg-004",
        from: "alice@gmail.com",
        subject: "Dinner this weekend?",
        body: "Are you free this Saturday evening?",
      },
      {
        messageId: "msg-005",
        from: "amazon@amazon.com",
        subject: "Your order has been shipped",
        body: "Your package will arrive tomorrow.",
      },
      {
        messageId: "msg-006",
        from: "lottery@winner.com",
        subject: "You won $1,000,000!",
        body: "Claim your prize immediately.",
      },
    ];

    for (const mail of emails) {
      const aiCategory = await classifyEmail(
        mail.subject,
        mail.body
      );

      await Email.create({
        ...mail,
        aiCategory,
      });
    }

    console.log("✅ Emails classified using OpenAI and stored in MongoDB");
  } catch (error) {
    console.error("❌ Failed to seed emails:", error.message);
  }
};

export default seedEmails;
