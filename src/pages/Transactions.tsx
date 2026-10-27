import React from 'react';
import TransactionList from '../components/TransactionList';

const Transactions: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Transaction Monitoring</h1>
        <p className="text-gray-400 mt-1">Monitor and investigate UPI transactions</p>
      </div>

      <TransactionList height={700} />
    </div>
  );
};

export default Transactions;