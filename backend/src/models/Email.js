import mongoose from "mongoose";

const emailSchema = new mongoose.Schema(
  {
    messageId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    from: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    body: {
      type: String,
      required: true,
    },

    receivedAt: {
      type: Date,
      default: Date.now,
    },

    // AI predicted category
    aiCategory: {
      type: String,
      enum: ["Work", "Personal", "Promotions", "Spam"],
      required: true,
    },

    // User corrected category (optional)
    userCategory: {
      type: String,
      enum: ["Work", "Personal", "Promotions", "Spam"],
      default: null,
    },

    // Whether AI prediction is correct
    isCorrect: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure isCorrect stays in sync
emailSchema.pre("save", function (next) {
  if (this.userCategory) {
    this.isCorrect = this.userCategory === this.aiCategory;
  }
  next();
});

const Email = mongoose.model("Email", emailSchema);

export default Email;
