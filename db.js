const mongoose = require("mongoose");

module.exports = async function connectDB() {
  const uri = "mongodb+srv://rajg99842_db_user:69rOx5nTReWQNWmW@studydesk.5nzojj3.mongodb.net/mini-ats?retryWrites=true&w=majority&appName=StudyDesk";
  await mongoose.connect(uri);
  console.log("MongoDB connected:", mongoose.connection.host);
};
