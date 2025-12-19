const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  owes: [
    {
      toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      amount: Number
    }
  ]
});

module.exports = mongoose.model("Balance", balanceSchema);
