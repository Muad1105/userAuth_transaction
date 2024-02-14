import { User } from "../model/userModel.js";
import bcrypt from "bcrypt";

const changePassword = async (req, res, next) => {
  console.log("change password");
  const userId = req.params.userId;
  const { email, oldPassword, newPassword } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("user", user);
    // Check if the old password matches the current password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update only the password field of the user
    await User.updateOne({ email }, { password: hashedPassword });

    // Respond with success message
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default changePassword;
