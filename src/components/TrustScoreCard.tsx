import React from 'react';
import { Shield, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';

export interface TrustScoreProps {
  score: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  confidence: number;
  factors?: string[];
  className?: string;
}

const TrustScoreCard: React.FC<TrustScoreProps> = ({
  score,
  riskLevel,
  confidence,
  factors = [],
  className = ''
}) => {
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

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'LOW':
        return <CheckCircle className="w-5 h-5" />;
      case 'MEDIUM':
        return <Shield className="w-5 h-5" />;
      case 'HIGH':
        return <AlertTriangle className="w-5 h-5" />;
      case 'CRITICAL':
        return <XCircle className="w-5 h-5" />;
      default:
        return <Shield className="w-5 h-5" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Trust Score</h3>
        <div className={`flex items-center px-3 py-1 rounded-full ${getRiskColor(riskLevel)}`}>
          {getRiskIcon(riskLevel)}
          <span className="ml-2 text-sm font-medium">{riskLevel} RISK</span>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div className="text-4xl font-bold mr-4">
          <span className={getScoreColor(score)}>{score}</span>
          <span className="text-gray-500 text-2xl">/100</span>
        </div>
        <div className="flex-1">
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-300 ${
                score >= 80 ? 'bg-green-500' :
                score >= 60 ? 'bg-yellow-500' :
                score >= 40 ? 'bg-orange-500' : 'bg-red-500'
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Model Confidence</span>
          <span className="text-white font-medium">{confidence}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>

      {factors.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Key Risk Factors</h4>
          <div className="space-y-1">
            {factors.slice(0, 3).map((factor, index) => (
              <div key={index} className="text-sm text-gray-400 flex items-center">
                <div className="w-1 h-1 bg-gray-500 rounded-full mr-2" />
                {factor}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrustScoreCard;