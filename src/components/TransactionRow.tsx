import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Shield } from 'lucide-react';

export interface Transaction {
  txId: string;
  timestamp: string;
  fromVpa: string;
  toVpa: string;
  amount: number;
  currency: string;
  trustScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

interface TransactionRowProps {
  transaction: Transaction;
  onClick?: (txId: string) => void;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction, onClick }) => {
  const navigate = useNavigate();

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW':
        return 'text-green-400 bg-green-900/30';
      case 'MEDIUM':
        return 'text-yellow-400 bg-yellow-900/30';
      case 'HIGH':
        return 'text-orange-400 bg-orange-900/30';
      case 'CRITICAL':
        return 'text-red-400 bg-red-900/30';
      default:
        return 'text-gray-400 bg-gray-900/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-400 bg-green-900/30';
      case 'PENDING':
        return 'text-yellow-400 bg-yellow-900/30';
      case 'FAILED':
        return 'text-red-400 bg-red-900/30';
      default:
        return 'text-gray-400 bg-gray-900/30';
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick(transaction.txId);
    } else {
      navigate(`/transaction/${transaction.txId}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-750 cursor-pointer transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-sm font-mono text-gray-300">
              {transaction.txId}
            </span>
            <div className={`flex items-center px-2 py-1 rounded-full text-xs ${getRiskColor(transaction.riskLevel)}`}>
              <Shield className="w-3 h-3 mr-1" />
              {transaction.riskLevel}
            </div>
            <div className={`flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(transaction.status)}`}>
              {transaction.status}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-400">From: </span>
              <span className="text-white">{transaction.fromVpa}</span>
            </div>
            <div>
              <span className="text-gray-400">To: </span>
              <span className="text-white">{transaction.toVpa}</span>
            </div>
            <div>
              <span className="text-gray-400">Amount: </span>
              <span className="text-white font-medium">
                ₹{transaction.amount.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-gray-400 mr-1" />
              <span className="text-gray-300">
                {new Date(transaction.timestamp).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="flex items-center mt-3">
            <span className="text-gray-400 text-sm mr-2">Trust Score:</span>
            <div className="flex items-center">
              <span className={`font-bold text-lg ${
                transaction.trustScore >= 80 ? 'text-green-400' :
                transaction.trustScore >= 60 ? 'text-yellow-400' :
                transaction.trustScore >= 40 ? 'text-orange-400' : 'text-red-400'
              }`}>
                {transaction.trustScore}
              </span>
              <span className="text-gray-500 text-sm ml-1">/100</span>
            </div>
          </div>
        </div>

        <ArrowRight className="w-5 h-5 text-gray-400 ml-4" />
      </div>
    </div>
  );
};

export default TransactionRow;