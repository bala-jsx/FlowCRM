import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    contact: {
      email: String,
      phone: String,
    },

    budget: {
      type: String,
      enum: ["below_5k", "5k_10k", "10k_plus"],
    },

    authority: {
      type: String,
      enum: ["decision_maker", "influencer", "end-user"],
    },

    need: String,

    timeline: {
      type: String,
      enum: ["immediate", "1_month", "3_months", "later"],
    },

    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "proposal", "closed"],
      default: "new",
    },

    priority: {
      type: String,
      enum: ["hot", "warm", "cold"],
      default: "cold",
    },

    score: { type: Number, default: 0 },

    source: {
      type: String,
      enum: ["manual", "csv", "api"],
      default: "manual",
    },

    // 🧠 ACTIVITY TIMELINE (NEW)
    activities: [
      {
        type: {
          type: String,
        },
        message: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);