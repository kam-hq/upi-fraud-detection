import React, { useState, useEffect } from 'react';
import TrustScoreCard from '../components/TrustScoreCard';
import TransactionList from '../components/TransactionList';
import { 
  TrendingUp, 
  Shield, 
  AlertTriangle, 
  Activity,
  Users,
  DollarSign 
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
          value={`${stats.avgTrustScore}/100`}
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