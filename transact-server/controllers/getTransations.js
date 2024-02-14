import Transaction from "../model/transactionModel.js";

const getUserTransactions = async (req, res) => {
  try {
    const userId = req.params.userId;
    const transactions = await Transaction.find({ userId });
    console.log(transactions);
    res.status(200).json({ success: true, transactions });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default getUserTransactions;
