import React, { useState, useEffect } from 'react';
import TrustScoreCard from '../components/TrustScoreCard';
import TransactionList from '../components/TransactionList';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Shield, 
  AlertTriangle, 
  Activity,
  Users,
  DollarSign,
  Search,
  Phone,
  AtSign
} from 'lucide-react';

interface DashboardStats {
  totalTransactions: number;
  riskTransactions: number;
  avgTrustScore: number;
  activeUsers: number;
  totalVolume: number;
  fraudPrevented: number;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalTransactions: 0,
    riskTransactions: 0,
    avgTrustScore: 0,
    activeUsers: 0,
    totalVolume: 0,
    fraudPrevented: 0,
  });

  const [recentAlerts, setRecentAlerts] = useState([
    {
      id: '1',
      type: 'HIGH',
      message: 'Unusual transaction pattern detected',
      txId: 'UPI202501234567',
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: '2',
      type: 'CRITICAL',
      message: 'Potential account takeover attempt',
      txId: 'UPI202501234568',
      timestamp: new Date(Date.now() - 600000),
    },
  ]);

  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userSearchResult, setUserSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Mock API call - replace with real data
    setStats({
      totalTransactions: 12547,
      riskTransactions: 234,
      avgTrustScore: 87,
      activeUsers: 8945,
      totalVolume: 45672340,
      fraudPrevented: 1230000,
    });
  }, []);

  const handleUserSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userSearchQuery.trim()) return;

    setIsSearching(true);
    try {
      // Mock API call - replace with real API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const isPhone = /^\d{10}$/.test(userSearchQuery);
      const isUPI = userSearchQuery.includes('@');
      
      if (!isPhone && !isUPI) {
        alert('Please enter a valid 10-digit phone number or UPI ID');
        return;
      }

      const mockResult = {
        identifier: userSearchQuery,
        type: isPhone ? 'phone' : 'upi',
        trustScore: Math.floor(Math.random() * 100),
        riskLevel: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'][Math.floor(Math.random() * 4)],
        confidence: 85 + Math.floor(Math.random() * 15),
        lastUpdated: new Date().toISOString(),
        transactionCount: Math.floor(Math.random() * 500) + 10,
      };
      
      setUserSearchResult(mockResult);
    } catch (err) {
      alert('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    trend, 
    trendValue,
    color = 'blue' 
  }: {
    title: string;
    value: string | number;
    icon: React.ComponentType<any>;
    trend?: 'up' | 'down';
    trendValue?: string;
    color?: 'blue' | 'green' | 'red' | 'yellow';
  }) => {
    const colorClasses = {
      blue: 'text-blue-400 bg-blue-900/30',
      green: 'text-green-400 bg-green-900/30',
      red: 'text-red-400 bg-red-900/30',
      yellow: 'text-yellow-400 bg-yellow-900/30',
    };

    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
            {trend && trendValue && (
              <div className={`flex items-center mt-2 text-sm ${
                trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                <TrendingUp className={`w-4 h-4 mr-1 ${trend === 'down' ? 'rotate-180' : ''}`} />
                {trendValue}
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Security Dashboard</h1>
          <p className="text-gray-400 mt-1">Real-time fraud detection and monitoring</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-300">
            <Activity className="w-4 h-4 mr-1 text-green-400" />
            System Active
          </div>
        </div>
      </div>

      {/* User Lookup Section */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Search className="w-5 h-5 mr-2 text-blue-400" />
          User Trust Score Lookup
        </h3>
        <form onSubmit={handleUserSearch} className="flex gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={userSearchQuery}
              onChange={(e) => setUserSearchQuery(e.target.value)}
              placeholder="Enter phone number (10 digits) or UPI ID (user@bank)"
              className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>
        
        {userSearchResult && (
          <div className="mt-4 p-4 bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {userSearchResult.type === 'phone' ? (
                  <Phone className="w-5 h-5 mr-2 text-blue-400" />
                ) : (
                  <AtSign className="w-5 h-5 mr-2 text-green-400" />
                )}
                <div>
                  <p className="text-white font-medium">{userSearchResult.identifier}</p>
                  <p className="text-gray-400 text-sm">
                    Trust Score: <span className={`font-bold ${
                      userSearchResult.trustScore >= 80 ? 'text-green-400' :
                      userSearchResult.trustScore >= 60 ? 'text-yellow-400' :
                      userSearchResult.trustScore >= 40 ? 'text-orange-400' : 'text-red-400'
                    }`}>
                      {userSearchResult.trustScore}/100
                    </span> | Risk: <span className={`font-medium ${
                      userSearchResult.riskLevel === 'LOW' ? 'text-green-400' :
                      userSearchResult.riskLevel === 'MEDIUM' ? 'text-yellow-400' :
                      userSearchResult.riskLevel === 'HIGH' ? 'text-orange-400' : 'text-red-400'
                    }`}>
                      {userSearchResult.riskLevel}
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/user-profile/${encodeURIComponent(userSearchResult.identifier)}`)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                View Details
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Transactions"
          value={stats.totalTransactions.toLocaleString()}
          icon={Activity}
          trend="up"
          trendValue="+12%"
          color="blue"
        />
        <StatCard
          title="Risk Transactions"
          value={stats.riskTransactions}
          icon={AlertTriangle}
          trend="down"
          trendValue="-8%"
          color="red"
        />
        <StatCard
          title="Average Trust Score"
          value={\`${stats.avgTrustScore}/100`}
          icon={Shield}
          trend="up"
          trendValue="+3%"
          color="green"
        />
        <StatCard
          title="Active Users"
          value={stats.activeUsers.toLocaleString()}
          icon={Users}
          trend="up"
          trendValue="+15%"
          color="blue"
        />
        <StatCard
          title="Transaction Volume"
          value={`₹${(stats.totalVolume / 10000000).toFixed(1)}Cr`}
          icon={DollarSign}
          trend="up"
          trendValue="+22%"
          color="green"
        />
        <StatCard
          title="Fraud Prevented"
          value={`₹${(stats.fraudPrevented / 100000).toFixed(1)}L`}
          icon={Shield}
          trend="up"
          trendValue="+5%"
          color="yellow"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trust Score Overview */}
        <div className="lg:col-span-1">
          <TrustScoreCard
            score={stats.avgTrustScore}
            riskLevel="LOW"
            confidence={94}
            factors={[
              'Transaction velocity normal',
              'No device anomalies detected',
              'Regular payee pattern'
            ]}
          />
        </div>

        {/* Recent Alerts */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Security Alerts</h3>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`p-4 rounded-lg border ${
                    alert.type === 'CRITICAL' 
                      ? 'bg-red-900/30 border-red-500/50' 
                      : 'bg-yellow-900/30 border-yellow-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertTriangle className={`w-5 h-5 mr-3 ${
                        alert.type === 'CRITICAL' ? 'text-red-400' : 'text-yellow-400'
                      }`} />
                      <div>
                        <p className="text-white font-medium">{alert.message}</p>
                        <p className="text-gray-400 text-sm">Transaction: {alert.txId}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">
                      {alert.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
        </div>
        <div className="p-6">
          <TransactionList height={400} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;