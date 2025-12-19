const Balance = require("../models/Balance");

async function updateBalance(from, to, amount) {
  if (from.toString() === to.toString()) return;

  let fromBalance = await Balance.findOne({ user: from });
  if (!fromBalance) {
    fromBalance = await Balance.create({ user: from, owes: [] });
  }

  const existing = fromBalance.owes.find(
    b => b.toUser.toString() === to.toString()
  );

  if (existing) {
    existing.amount += amount;
  } else {
    fromBalance.owes.push({ toUser: to, amount });
  }

  await fromBalance.save();
}

module.exports = updateBalance;
