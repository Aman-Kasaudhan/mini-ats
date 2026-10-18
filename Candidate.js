const mongoose = require("mongoose");

const STAGES = ["Applied", "Screening", "Interview", "Offer", "Hired", "Rejected"];

const schema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: {
      type: String, required: [true, "Email is required"], trim: true, lowercase: true,
      unique: true, match: [/^\S+@\S+\.\S+$/, "Enter a valid email"],
    },
    phone: { type: String, trim: true, default: "" },
    role: { type: String, required: [true, "Role is required"], trim: true },
    source: { type: String, default: "Website" },
    stage: { type: String, enum: STAGES, default: "Applied" },
    notes: { type: String, default: "" },
    history: [{ _id: false, stage: String, at: { type: Date, default: Date.now } }],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, d) => ({
        id: d._id, name: d.name, email: d.email, phone: d.phone, role: d.role,
        source: d.source, stage: d.stage, notes: d.notes, history: d.history,
        created: d.createdAt, updated: d.updatedAt,
      }),
    },
  }
);

module.exports = mongoose.model("Candidate", schema);
module.exports.STAGES = STAGES;
