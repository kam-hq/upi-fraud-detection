import React, { useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import TransactionRow, { Transaction } from './TransactionRow';
import { Search, Filter } from 'lucide-react';

interface TransactionListProps {
  height?: number;
  onTransactionClick?: (txId: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  height = 600,
  onTransactionClick 
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call
    const mockTransactions: Transaction[] = Array.from({ length: 100 }, (_, i) => ({
      txId: `UPI${Date.now()}${i.toString().padStart(3, '0')}`,
      timestamp: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
      fromVpa: `user${Math.floor(Math.random() * 1000)}@paytm`,
      toVpa: `merchant${Math.floor(Math.random() * 100)}@gpay`,
      amount: Math.floor(Math.random() * 50000) + 100,
      currency: 'INR',
      trustScore: Math.floor(Math.random() * 100),
      riskLevel: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'][Math.floor(Math.random() * 4)] as any,
      status: ['COMPLETED', 'PENDING', 'FAILED'][Math.floor(Math.random() * 3)] as any,
    }));
    
    setTransactions(mockTransactions);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = transactions;

    if (searchTerm) {
      filtered = filtered.filter(tx => 
        tx.txId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.fromVpa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.toVpa.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (riskFilter !== 'ALL') {
      filtered = filtered.filter(tx => tx.riskLevel === riskFilter);
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, riskFilter]);

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <div className="p-2">
        <TransactionRow 
          transaction={filteredTransactions[index]} 
          onClick={onTransactionClick}
        />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading transactions...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="pl-10 pr-8 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="LOW">Low Risk</option>
            <option value="MEDIUM">Medium Risk</option>
            <option value="HIGH">High Risk</option>
            <option value="CRITICAL">Critical Risk</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="text-sm text-gray-400">
        Showing {filteredTransactions.length} of {transactions.length} transactions
      </div>

      {/* Virtualized List */}
      <div className="border border-gray-700 rounded-lg">
        <List
          height={height}
          itemCount={filteredTransactions.length}
          itemSize={120}
          width="100%"
        >
          {Row}
        </List>
      </div>
    </div>
  );
};

export default TransactionList;