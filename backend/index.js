require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors({
  origin : [
    "http://localhost:5173",
    "https://expense-splitter-omega-jet.vercel.app/"
  ],
  credentials: true
}));
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/groups", require("./routes/group"));
app.use("/expenses", require("./routes/expense"));
app.use("/balances", require("./routes/balance"));

app.listen(3000, () =>
  console.log(" Server running on port 3000")
);
