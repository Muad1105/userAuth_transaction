import Transaction from "../model/transactionModel.js";

const addTransaction = async (req, res) => {
  try {
    const { userId, amount, description } = req.body;

    const latestTransaction = await Transaction.findOne({ userId }).sort({
      createdAt: -1,
    });

    let prevTotalAmount = 0; // For initial Transaction
    let presentTotalAmount = amount;

    if (latestTransaction) {
      // If there's a latest transaction, update prevTotalAmount and presentTotalAmount
      prevTotalAmount = latestTransaction.presentTotalAmount;
      presentTotalAmount = Number(amount) + Number(prevTotalAmount);
    }

    const transactionData = {
      userId,
      amount,
      description,
      prevTotalAmount,
      presentTotalAmount,
    };

    const transaction = new Transaction(transactionData);
    await transaction.save();

    res
      .status(201)
      .json({ success: true, message: "Transaction added successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default addTransaction;
