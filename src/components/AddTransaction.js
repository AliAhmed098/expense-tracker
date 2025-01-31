

import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { v4 as uuidv4 } from 'uuid';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');
  const [incomeType, setIncomeType] = useState('Salary');
  const [category, setCategory] = useState('Grocery');
  const [transactionType, setTransactionType] = useState('Income'); // Default to Income

  const { addTransaction, balance } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: uuidv4(),
      text,
      amount: transactionType === 'Expense' ? -Math.abs(amount) : +Math.abs(amount),
      date,
      incomeType: transactionType === 'Income' ? incomeType : null,
      category: transactionType === 'Expense' ? category : null,
    };


    if (transactionType === 'Expense' && Math.abs(amount) > balance) {
      alert('Insufficient balance for this expense!');
      return;
    }

    addTransaction(newTransaction);

    // Reset form
    setText('');
    setAmount(0);
    setDate('');
    setIncomeType('Salary');
    setCategory('Grocery');
    setTransactionType('Income');
  };

  return (
    <>
      <h3 style={{ textAlign: 'center'}}>Add New Transaction</h3>
      <form onSubmit={onSubmit}>
        {/* Transaction Type Selector */}
        <div className="form-control">
          <label htmlFor="transactionType">Transaction Type</label>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        {/* Income Section */}
        {transactionType === 'Income' && (
          <div className="income-section box">
            <h4>Income Details</h4>
            <div className="form-control">
              <label htmlFor="text">Description</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter income description..."
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter income amount..."
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="incomeType">Income Type</label>
              <select
                value={incomeType}
                onChange={(e) => setIncomeType(e.target.value)}
              >
                <option value="Salary">Salary</option>
                <option value="Business">Business</option>
                <option value="Freelancing">Freelancing</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-control">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        {/* Expense Section */}
        {transactionType === 'Expense' && (
          <div className="expense-section box">
            <h4>Expense Details</h4>
            <div className="form-control">
              <label htmlFor="text">Description</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter expense description..."
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter expense amount..."
                required
              />
            </div>

            <div className="form-control">
              <label htmlFor="category">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="House Rent">House Rent</option>
                <option value="Car Expense">Car Expense</option>
                <option value="Grocery">Grocery</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-control">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button className="btn">Add Transaction</button>
      </form>
    </>
  );
};
