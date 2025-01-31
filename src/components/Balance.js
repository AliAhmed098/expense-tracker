import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);
  const total = transactions
    .reduce((acc, item) => acc + item.amount, 0)
    .toFixed(2);

  return (
    <>
      <h4 style={{ textAlign: 'center' }}>Your Balance</h4>
      <h1 style={{ textAlign: 'center' }}>${total}</h1>
    </>
  );
};
