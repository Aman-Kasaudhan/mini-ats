require("dotenv").config();
const mongoose = require("mongoose");
const Candidate = require("./Candidate");

const rows = [
  ["Aarav Sharma", "Frontend Developer", "LinkedIn", "Interview"],
  ["Priya Nair", "Backend Developer", "Referral", "Offer"],
  ["Rohan Mehta", "Frontend Developer", "Job board", "Screening"],
  ["Sneha Iyer", "Product Designer", "Website", "Applied"],
  ["Kabir Singh", "Backend Developer", "Campus", "Hired"],
  ["Ananya Rao", "Data Analyst", "LinkedIn", "Rejected"],
  ["Vikram Joshi", "Product Designer", "Referral", "Interview"],
  ["Meera Pillai", "Data Analyst", "Job board", "Applied"],
];

(async () => {
  await mongoose.connect("mongodb+srv://rajg99842_db_user:DajYL1dVR8LdqZWE@studydesk.5nzojj3.mongodb.net/?appName=StudyDesk" || "mongodb://127.0.0.1:27017/mini-ats");
  await Candidate.deleteMany({});
  await Candidate.insertMany(rows.map(([name, role, source, stage]) => ({
    name, role, source, stage,
    email: name.split(" ")[0].toLowerCase() + "@example.com",
    history: stage === "Applied" ? [{ stage }] : [{ stage: "Applied" }, { stage }],
  })));
  console.log("Seeded", rows.length, "candidates");
  await mongoose.disconnect();
})();
