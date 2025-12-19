const express = require("express");
const Expense = require("../models/Expense");
const Group = require("../models/Group");
const updateBalance = require("../utils/updateBalance");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { groupId, amount, description, paidBy } = req.body;

    if (!groupId || !amount || !paidBy) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ msg: "Group not found" });

    const members = group.members;
    const share = amount / members.length;

    const splits = members.map((userId) => ({
      userId,
      amount: share,
    }));

    const expense = await Expense.create({
      groupId,
      paidBy,
      amount,
      splits,
      description,
    });

    for (let split of splits) {
      if (split.userId.toString() !== paidBy) {
        await updateBalance(split.userId, paidBy, split.amount);
      }
    }

    res.json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to add expense" });
  }
});

router.get("/group/:id", auth, async (req, res) => {
  const expenses = await Expense.find({ groupId: req.params.id })
    .populate("paidBy", "name");
  res.json(expenses);
});

module.exports = router;
