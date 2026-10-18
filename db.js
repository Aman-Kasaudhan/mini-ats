const mongoose = require("mongoose");

module.exports = async function connectDB() {
  const uri = "mongodb+srv://rajg99842_db_user:DajYL1dVR8LdqZWE@studydesk.5nzojj3.mongodb.net/?appName=StudyDesk" || "mongodb://127.0.0.1:27017/mini-ats";
  await mongoose.connect(uri);
  console.log("MongoDB connected:", mongoose.connection.host);
};
