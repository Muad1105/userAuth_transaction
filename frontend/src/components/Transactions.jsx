import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setTransationsDone } from "../redux/transactionReducer";
axios.defaults.withCredentials = true;

const Transactions = () => {
  const [addTransaction, setAddTransaction] = useState({
    amount: 0,
    description: "",
  });
  const [prevTransactionData, setPrevTransactionData] = useState({});

  const [userLastTransaction, setUserLastTransaction] = useState({});

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userData.userId);
  console.log(userId);
  useEffect(() => {
    getTransactionsData();
  }, []);

  useEffect(() => {
    getTransactionsData();
  }, [userId]);

  const userTransactionDone = useSelector(
    (state) => state.transactionsData.transactionDone
  );
  console.log(userTransactionDone);

  useEffect(() => {
    setAddTransaction((prev) => ({
      ...prev,
      amount: 0,
      description: "",
    }));

    getTransactionsData();
  }, [userTransactionDone]);

  const getTransactionsData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/transactions/user/${userId}`
      );
      console.log(res);
      //current transaction Data
      const presentTransaction =
        res.data.transactions[res.data.transactions.length - 1];
      console.log(presentTransaction);

      //prev transaction data
      const prevTransaction =
        res.data.transactions[res.data.transactions.length - 2];
      console.log(presentTransaction);
      // console.log(prevTransaction);

      setUserLastTransaction(presentTransaction);
      setPrevTransactionData(prevTransaction);
      dispatch(setTransationsDone(false));
    } catch (err) {
      console.log(err.response.status);
    }
  };

  const handleAddAmount = async () => {
    console.log(addTransaction);
    if (!addTransaction.amount) {
      return;
    }
    const data = {
      userId,
      amount: addTransaction.amount,
      description: addTransaction.description,
    };
    try {
      const res = await axios.post(
        `http://localhost:4000/transactions/add`,
        data
      );
      console.log(res);
      setAddTransaction((prev) => ({
        ...prev,
        amount: 0,
        description: "",
      }));
      dispatch(setTransationsDone(true));
    } catch (err) {
      console.log(err.response.status);
    }
  };
  useEffect(() => {
    console.log(addTransaction);
  }, [addTransaction]);

  const handleAmountInput = (e) => {
    console.log(e.target.value);
    setAddTransaction((prev) => ({ ...prev, amount: e.target.value }));
  };

  const handleDescriptionInput = (e) => {
    setAddTransaction((prev) => ({ ...prev, description: e.target.value }));
  };

  return (
    <div>
      <div className="flex flex-col gap-y-4">
        <div>
          <h3>
            Prev Transaction:{" "}
            <span>
              prev Balace:{" "}
              {(userLastTransaction && userLastTransaction.prevTotalAmount) ||
                0}
            </span>
            {}
          </h3>
        </div>
        <div>
          <label>Add Amount : </label>
          <input
            type="number"
            value={
              addTransaction && addTransaction.amount && addTransaction.amount
            }
            className="border-2 border-blue-600"
            onChange={(e) => handleAmountInput(e)}
          />
        </div>
        <div>
          <label>Description : </label>
          <input
            type="text"
            value={
              addTransaction &&
              addTransaction.description &&
              addTransaction.description
            }
            className="border-2 border-blue-600"
            onChange={(e) => handleDescriptionInput(e)}
          />
        </div>
        <Button
          variant="contained"
          size="small"
          style={{ width: "80px" }}
          onClick={() => handleAddAmount()}
        >
          Add
        </Button>{" "}
        <div>
          <label>
            Balance : $
            <span>{userLastTransaction?.presentTotalAmount || 0}</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
