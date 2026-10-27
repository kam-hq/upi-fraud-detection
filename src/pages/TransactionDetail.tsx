import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Link, Shield, Clock, User, MapPin } from 'lucide-react';
import TrustScoreCard from '../components/TrustScoreCard';

interface TransactionDetails {
  txId: string;
  timestamp: string;
  fromVpa: string;
  toVpa: string;
  amount: number;
  currency: string;
  trustScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  confidence: number;
  topFactors: Array<{
    feature: string;
    impact: number;
    description: string;
  }>;
  deviceInfo: {
    fingerprint: string;
    ip: string;
    location: string;
    isNewDevice: boolean;
  };
  anchorInfo?: {
    isAnchored: boolean;
    txHash?: string;
    blockNumber?: number;
    timestamp?: string;
  };
}

const TransactionDetail: React.FC = () => {
  const { txId } = useParams<{ txId: string }>();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState<TransactionDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call - replace with real data
    const fetchTransaction = async () => {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
      const mockTransaction: TransactionDetails = {
        txId: txId || 'UPI202501234567',
        timestamp: new Date().toISOString(),
        fromVpa: 'user123@paytm',
        toVpa: 'merchant456@gpay',
        amount: 25000,
        currency: 'INR',
        trustScore: 23,
        riskLevel: 'HIGH',
        status: 'COMPLETED',
        confidence: 89,
        topFactors: [
          {
            feature: 'transaction_amount',
            impact: 0.45,
            description: 'Amount significantly higher than user average'
          },
          {
            feature: 'time_of_day',
            impact: 0.32,
            description: 'Transaction occurred at unusual hour (3:42 AM)'
          },
          {
            feature: 'new_payee',
            impact: 0.28,
            description: 'First time transaction to this merchant'
          },
          {
            feature: 'device_change',
            impact: 0.21,
            description: 'Different device than recent transactions'
          },
          {
            feature: 'velocity',
            impact: 0.18,
            description: '5 transactions in past hour (above threshold)'
          }
        ],
        deviceInfo: {
          fingerprint: 'fp_abc123xyz789',
          ip: '203.192.xxx.xxx',
          location: 'Mumbai, Maharashtra, IN',
          isNewDevice: true
        },
        anchorInfo: {
          isAnchored: true,
          txHash: '0x1234567890abcdef...',
          blockNumber: 12345678,
          timestamp: new Date(Date.now() - 3600000).toISOString()
        }
      };
      
      setTransaction(mockTransaction);
      setLoading(false);
    };

    fetchTransaction();
  }, [txId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading transaction details...</div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="text-center">
        <p className="text-gray-400">Transaction not found</p>
        <button
          onClick={() => navigate('/transactions')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Transactions
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/transactions')}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white">Transaction Analysis</h1>
          <p className="text-gray-400 mt-1">Detailed investigation for {transaction.txId}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trust Score */}
        <div>
          <TrustScoreCard
            score={transaction.trustScore}
            riskLevel={transaction.riskLevel}
            confidence={transaction.confidence}
            factors={transaction.topFactors.slice(0, 3).map(f => f.description)}
          />
        </div>

        {/* Transaction Details */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Transaction Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Transaction ID:</span>
                <p className="text-white font-mono">{transaction.txId}</p>
              </div>
              <div>
                <span className="text-gray-400">Status:</span>
                <p className={`font-medium ${
                  transaction.status === 'COMPLETED' ? 'text-green-400' :
                  transaction.status === 'PENDING' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {transaction.status}
                </p>
              </div>
              <div>
                <span className="text-gray-400">From VPA:</span>
                <p className="text-white">{transaction.fromVpa}</p>
              </div>
              <div>
                <span className="text-gray-400">To VPA:</span>
                <p className="text-white">{transaction.toVpa}</p>
              </div>
              <div>
                <span className="text-gray-400">Amount:</span>
                <p className="text-white font-semibold">
                  ₹{transaction.amount.toLocaleString('en-IN')} {transaction.currency}
                </p>
              </div>
              <div>
                <span className="text-gray-400">Timestamp:</span>
                <p className="text-white">{new Date(transaction.timestamp).toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Risk Factor Analysis</h3>
        <div className="space-y-3">
          {transaction.topFactors.map((factor, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <div className="flex-1">
                <p className="text-white font-medium">{factor.feature.replace(/_/g, ' ').toUpperCase()}</p>
                <p className="text-gray-400 text-sm">{factor.description}</p>
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  <div className="w-20 bg-gray-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        factor.impact > 0.4 ? 'bg-red-500' :
                        factor.impact > 0.25 ? 'bg-orange-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${factor.impact * 100}%` }}
                    />
                  </div>
                  <span className="ml-2 text-sm text-gray-300">{(factor.impact * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Information */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Device Information
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-gray-400 text-sm">Device Fingerprint:</span>
              <p className="text-white font-mono">{transaction.deviceInfo.fingerprint}</p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">IP Address:</span>
              <p className="text-white">{transaction.deviceInfo.ip}</p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Location:</span>
              <p className="text-white flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {transaction.deviceInfo.location}
              </p>
            </div>
            <div>
              <span className="text-gray-400 text-sm">Device Status:</span>
              <p className={`font-medium ${
                transaction.deviceInfo.isNewDevice ? 'text-yellow-400' : 'text-green-400'
              }`}>
                {transaction.deviceInfo.isNewDevice ? 'New Device' : 'Known Device'}
              </p>
            </div>
          </div>
        </div>

        {/* Blockchain Anchor */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Link className="w-5 h-5 mr-2" />
            Blockchain Anchor
          </h3>
          {transaction.anchorInfo?.isAnchored ? (
            <div className="space-y-3">
              <div className="flex items-center text-green-400">
                <Shield className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Transaction Anchored</span>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Transaction Hash:</span>
                <p className="text-white font-mono text-sm break-all">
                  {transaction.anchorInfo.txHash}
                </p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Block Number:</span>
                <p className="text-white">{transaction.anchorInfo.blockNumber}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Anchored At:</span>
                <p className="text-white flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {transaction.anchorInfo.timestamp && new Date(transaction.anchorInfo.timestamp).toLocaleString('en-IN')}
                </p>
              </div>
              <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View on Blockchain Explorer
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-400 mb-4">Transaction not yet anchored</p>
              <button className="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg cursor-not-allowed">
                Anchor Pending
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;