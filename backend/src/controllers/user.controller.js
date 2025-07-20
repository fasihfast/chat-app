import User from "../models/user.model.js";



// Route to find the "Technical Support" agent
export const getUsers = async (req, res) => {
  try {
    const supportAgent = await User.findOne({ fullName: "Technical Support" });

    if (!supportAgent) {
      return res.status(404).json({ message: "Support agent not found" });
    }

    res.json(supportAgent);
  } catch (err) {
    console.error("Error finding support agent:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getByName =  async (req, res) => {
  try {
    const fullName = req.params.fullName;
    const user = await User.findOne({ fullName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


