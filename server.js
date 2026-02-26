const express = require("express");
const cors=require("cors");
const http = require("http");
const dotenv = require("dotenv").config();
const sequelize = require("./config/db.js");
const PORT = process.env.PORT || 5000;
// const AboutRoutes=require("./routes/AboutRoutes");
const AuthorRoutes=require("./routes/AuthorRoutes");
const ArticleRoutes=require("./routes/ArticleRoutes");
const RegisterRoutes=require("./routes/RegisteRoutes.js");
const AuthRoutes=require("./routes/AuthRoutes.js");
if (!process.env.PORT) {
  console.warn("⚠️  PORT not specified in .env, using default 5000");
}
const app = express();

// Global Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 app.use(
      cors({ origin: ["http://localhost:3000","http://localhost:3002"], credentials: true })
    );

// app.use("/uploads", express.static("uploads"));
app.use("/API/v1.0.0/author",AuthorRoutes);
app.use("/API/v1.0.0/article",ArticleRoutes);
app.use("/API/v1.0.0/user",RegisterRoutes);
app.use("/API/v1.0.0/auth",AuthRoutes);
//health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    timestamp: new Date().toISOString(),
  });
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected (Sequelize)");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
})();


//start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});

