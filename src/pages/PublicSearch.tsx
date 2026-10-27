import React, { useState } from 'react';
import { Search, Shield, Phone, AtSign, AlertTriangle, CheckCircle, Clock, Link } from 'lucide-react';
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
          'Regular transaction patterns',
          'Verified device usage',
          'No recent fraud reports',
          'Consistent location patterns'
        ],
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
                    Always verify the identity of recipients before making transactions. Report suspicious activity to your bank immediately.
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