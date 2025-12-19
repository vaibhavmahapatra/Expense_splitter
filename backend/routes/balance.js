const express = require("express");
const Balance = require("../models/Balance");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/net", auth, async (req, res) => {
  const userId = req.userId;

  const myBalance = await Balance.findOne({ user: userId })
    .populate("owes.toUser", "name email");

  const youOwe = myBalance
    ? myBalance.owes.map(b => ({
        user: b.toUser,
        amount: b.amount
      }))
    : [];

  const othersOweYou = await Balance.find({
    "owes.toUser": userId
  }).populate("user", "name email");

  const youGet = [];

  for (let bal of othersOweYou) {
    const entry = bal.owes.find(
      o => o.toUser.toString() === userId
    );

    if (entry) {
      youGet.push({
        user: bal.user,
        amount: entry.amount
      });
    }
  }
 
  const totalOwe = youOwe.reduce((s, x) => s + x.amount, 0);
  const totalGet = youGet.reduce((s, x) => s + x.amount, 0);

  const net = totalGet - totalOwe;

  res.json({
    youOwe,
    youGet,
    totalOwe,
    totalGet,
    net
  });
});

module.exports = router;
