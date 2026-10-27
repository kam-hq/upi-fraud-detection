import React, { useState } from 'react';
import { Search, Shield, Phone, AtSign, AlertTriangle, CheckCircle, Clock, Link, User, MapPin, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import TrustScoreCard from '../components/TrustScoreCard';

interface SearchResult {
  identifier: string;
  type: 'phone' | 'upi';
  trustScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  confidence: number;
  lastUpdated: string;
  transactionCount: number;
  riskFactors: string[];
  trustworthyIndicators: string[];
  riskWarnings: string[];
  recommendation: 'HIGHLY_TRUSTED' | 'TRUSTED' | 'CAUTION' | 'HIGH_RISK';
  recentActivity: {
    last7Days: number;
    last30Days: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  };
  deviceInfo: {
    knownDevices: number;
    newDeviceRecent: boolean;
    locationConsistency: 'high' | 'medium' | 'low';
  };
  anchorInfo?: {
    isAnchored: boolean;
    txHash?: string;
    blockNumber?: number;
    timestamp?: string;
  };
}

const PublicSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError('Please enter a phone number or UPI ID');
      return;
    }

    setIsLoading(true);
    setError('');
    setSearchResult(null);

    try {
      // Mock API call - replace with real API
      await new Promise(resolve => setTimeout(resolve, 1500));

      const isPhone = /^\d{10}$/.test(searchQuery);
      const isUPI = searchQuery.includes('@');

      if (!isPhone && !isUPI) {
        setError('Please enter a valid 10-digit phone number or UPI ID');
        return;
      }

      // Mock search result
      const mockResult: SearchResult = {
        identifier: searchQuery,
        type: isPhone ? 'phone' : 'upi',
        trustScore: Math.floor(Math.random() * 100),
        riskLevel: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'][Math.floor(Math.random() * 4)] as any,
        confidence: 85 + Math.floor(Math.random() * 15),
        lastUpdated: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        transactionCount: Math.floor(Math.random() * 500) + 10,
        riskFactors: [
          'Unusual late-night transactions',
          'New payee interactions',
          'Higher than average amounts'
        ],
        trustworthyIndicators: [
          'Consistent transaction patterns for 2+ years',
          'Verified device usage with no anomalies',
          'No fraud reports in past 12 months',
          'Regular payee relationships established',
          'Location patterns match registered address'
        ],
        riskWarnings: [
          'Recent increase in transaction frequency',
          'New device detected last week'
        ],
        recommendation: ['HIGHLY_TRUSTED', 'TRUSTED', 'CAUTION', 'HIGH_RISK'][Math.floor(Math.random() * 4)] as any,
        recentActivity: {
          last7Days: Math.floor(Math.random() * 20) + 5,
          last30Days: Math.floor(Math.random() * 100) + 20,
          trend: ['increasing', 'decreasing', 'stable'][Math.floor(Math.random() * 3)] as any
        },
        deviceInfo: {
          knownDevices: Math.floor(Math.random() * 3) + 1,
          newDeviceRecent: Math.random() > 0.7,
          locationConsistency: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as any
        },
        anchorInfo: {
          isAnchored: Math.random() > 0.3,
          txHash: '0x1234567890abcdef1234567890abcdef12345678',
          blockNumber: 12345678,
          timestamp: new Date(Date.now() - 3600000).toISOString()
        }
      };

      setSearchResult(mockResult);
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'LOW':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'MEDIUM':
        return <Shield className="w-5 h-5 text-yellow-400" />;
      case 'HIGH':
        return <AlertTriangle className="w-5 h-5 text-orange-400" />;
      case 'CRITICAL':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default:
        return <Shield className="w-5 h-5 text-gray-400" />;
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'HIGHLY_TRUSTED':
        return 'text-green-400 bg-green-900/30 border-green-500/50';
      case 'TRUSTED':
        return 'text-blue-400 bg-blue-900/30 border-blue-500/50';
      case 'CAUTION':
        return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/50';
      case 'HIGH_RISK':
        return 'text-red-400 bg-red-900/30 border-red-500/50';
      default:
        return 'text-gray-400 bg-gray-900/30 border-gray-500/50';
    }
  };

  const getRecommendationText = (recommendation: string) => {
    switch (recommendation) {
      case 'HIGHLY_TRUSTED':
        return 'This user appears highly trustworthy based on consistent patterns and no risk indicators.';
      case 'TRUSTED':
        return 'This user shows good trust indicators with minimal risk factors.';
      case 'CAUTION':
        return 'Exercise caution when transacting. Some risk factors detected.';
      case 'HIGH_RISK':
        return 'High risk detected. Avoid transactions and verify identity through other means.';
      default:
        return 'Unable to determine trustworthiness.';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Shield className="mx-auto h-12 w-12 text-blue-500" />
          <h1 className="mt-6 text-3xl font-extrabold text-white">
            UPI Trust Score Lookup
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Check the trust score and risk level for any phone number or UPI ID
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number or UPI ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter phone number (e.g., 9876543210) or UPI ID (e.g., user@paytm)"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Searching...
                </div>
              ) : (
                'Search Trust Score'
              )}
            </button>
          </form>
        </div>

        {/* Search Results */}
        {searchResult && (
          <div className="space-y-6">
            {/* Trust Recommendation Banner */}
            <div className={`rounded-lg p-6 border ${getRecommendationColor(searchResult.recommendation)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="w-8 h-8 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold">
                      {searchResult.recommendation.replace('_', ' ')} USER
                    </h3>
                    <p className="text-sm mt-1 opacity-90">
                      {getRecommendationText(searchResult.recommendation)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{searchResult.trustScore}/100</div>
                  <div className="text-sm opacity-75">Trust Score</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Trust Score Card */}
              <TrustScoreCard
                score={searchResult.trustScore}
                riskLevel={searchResult.riskLevel}
                confidence={searchResult.confidence}
                factors={searchResult.riskFactors}
              />

              {/* Details */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  {searchResult.type === 'phone' ? (
                    <Phone className="w-5 h-5 mr-2 text-blue-400" />
                  ) : (
                    <AtSign className="w-5 h-5 mr-2 text-green-400" />
                  )}
                  Search Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400 text-sm">Identifier:</span>
                    <p className="text-white font-mono">{searchResult.identifier}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Type:</span>
                    <p className="text-white capitalize">{searchResult.type}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Risk Level:</span>
                    <div className="flex items-center mt-1">
                      {getRiskIcon(searchResult.riskLevel)}
                      <span className="ml-2 text-white font-medium">{searchResult.riskLevel}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Transaction Count:</span>
                    <p className="text-white">{searchResult.transactionCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Last Updated:</span>
                    <p className="text-white flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(searchResult.lastUpdated).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Trustworthy Indicators */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                  Positive Trust Indicators
                </h3>
                <div className="space-y-2">
                  {searchResult.trustworthyIndicators.map((indicator, index) => (
                    <div key={index} className="flex items-start text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                      <span className="text-gray-300">{indicator}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Warnings */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
                  Risk Factors & Warnings
                </h3>
                <div className="space-y-2">
                  {searchResult.riskWarnings.length > 0 ? (
                    searchResult.riskWarnings.map((warning, index) => (
                      <div key={index} className="flex items-start text-sm">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                        <span className="text-gray-300">{warning}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-green-400 text-sm">No significant risk factors detected</div>
                  )}
                </div>
              </div>
            </div>

            {/* Activity Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-400" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400 text-sm">Last 7 Days:</span>
                    <p className="text-white font-semibold">{searchResult.recentActivity.last7Days} transactions</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Last 30 Days:</span>
                    <p className="text-white font-semibold">{searchResult.recentActivity.last30Days} transactions</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Trend:</span>
                    <div className="flex items-center mt-1">
                      {searchResult.recentActivity.trend === 'increasing' ? (
                        <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                      ) : searchResult.recentActivity.trend === 'decreasing' ? (
                        <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                      ) : (
                        <Activity className="w-4 h-4 text-gray-400 mr-1" />
                      )}
                      <span className="text-white capitalize">{searchResult.recentActivity.trend}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Device Information */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-purple-400" />
                  Device Profile
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400 text-sm">Known Devices:</span>
                    <p className="text-white font-semibold">{searchResult.deviceInfo.knownDevices}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">New Device Recently:</span>
                    <p className={`font-semibold ${searchResult.deviceInfo.newDeviceRecent ? 'text-yellow-400' : 'text-green-400'}`}>
                      {searchResult.deviceInfo.newDeviceRecent ? 'Yes' : 'No'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Location Consistency:</span>
                    <p className={`font-semibold capitalize ${
                      searchResult.deviceInfo.locationConsistency === 'high' ? 'text-green-400' :
                      searchResult.deviceInfo.locationConsistency === 'medium' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {searchResult.deviceInfo.locationConsistency}
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Score Breakdown */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-400" />
                  Score Breakdown
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Transaction History</span>
                      <span className="text-white">85%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Device Behavior</span>
                      <span className="text-white">78%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Network Patterns</span>
                      <span className="text-white">92%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Blockchain Anchor Status */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Link className="w-5 h-5 mr-2" />
                Blockchain Verification
              </h3>
              {searchResult.anchorInfo?.isAnchored ? (
                <div className="space-y-3">
                  <div className="flex items-center text-green-400">
                    <Shield className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Trust Score Verified on Blockchain</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Transaction Hash:</span>
                    <p className="text-white font-mono text-sm break-all">
                      {searchResult.anchorInfo.txHash}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Block Number:</span>
                    <p className="text-white">{searchResult.anchorInfo.blockNumber}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Anchored At:</span>
                    <p className="text-white flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {searchResult.anchorInfo.timestamp && new Date(searchResult.anchorInfo.timestamp).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    View on Blockchain Explorer
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-400 mb-4">Trust score not yet anchored on blockchain</p>
                  <div className="text-sm text-gray-500">
                    Anchoring provides tamper-proof verification of trust scores
                  </div>
                </div>
              )}
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3 mt-0.5" />
                <div>
                  <h4 className="text-yellow-400 font-medium">Important Disclaimer</h4>
                  <p className="text-yellow-200 text-sm mt-1">
                    This trust score is for informational purposes only and should not be the sole basis for financial decisions. 
                    Always verify the identity of recipients through multiple channels before making transactions. 
                    Be especially cautious with high-value transactions and new payees. Report suspicious activity to your bank immediately.
                  </p>
                  <div className="mt-3 text-yellow-200 text-xs">
                    <strong>Safety Tips:</strong> Never share OTPs, verify payee details independently, use small test amounts for new recipients, 
                    and always double-check UPI IDs before confirming payments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicSearch;