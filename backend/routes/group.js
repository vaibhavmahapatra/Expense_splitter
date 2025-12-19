const express = require("express");
const Group = require("../models/Group");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { name, memberEmails } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Group name required" });
    }

    let members = [req.userId];

    if (memberEmails && memberEmails.length > 0) {
      const users = await User.find({
        email: { $in: memberEmails }
      });

      members.push(...users.map(u => u._id));
    }

    members = [...new Set(members.map(id => id.toString()))];

    const group = await Group.create({
      name,
      members,
      createdBy: req.userId
    });

    res.json(group);
  } catch (err) {
    console.error("CREATE GROUP ERROR:", err);
    res.status(500).json({ msg: "Failed to create group" });
  }
});

router.get("/", auth, async (req, res) => {
  const groups = await Group.find({ members: req.userId });
  res.json(groups);
});

router.delete("/:id", auth, async (req, res) => {
  const group = await Group.findById(req.params.id);
  if (!group) return res.status(404).json({ msg: "Not found" });

  if (group.createdBy.toString() !== req.userId) {
    return res.status(403).json({ msg: "Not allowed" });
  }

  await group.deleteOne();
  res.json({ msg: "Group deleted" });
});

router.post("/:id/add-member", auth, async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "Email required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }

    if (!group.members.includes(req.userId)) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    if (group.members.includes(user._id)) {
      return res.status(400).json({ msg: "User already in group" });
    }

    group.members.push(user._id);
    await group.save();

    res.json({ msg: "Member added successfully", group });
  } catch (err) {
    console.error("ADD MEMBER ERROR:", err);
    res.status(500).json({ msg: "Failed to add member" });
  }
});


module.exports = router;
