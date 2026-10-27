# AI UPI Fraud Detection System with Blockchain Anchoring

## Overview

The AI UPI Fraud Detection System is a comprehensive, production-ready platform designed to detect and prevent fraudulent UPI (Unified Payments Interface) transactions in real-time. The system combines advanced machine learning algorithms with blockchain technology to provide transparent, tamper-proof fraud detection and audit trails.

## 🚀 Key Features

### For Security Investigators
- **Real-time Fraud Detection**: AI-powered scoring with SHAP explainability
- **Live Transaction Monitoring**: WebSocket-based alerts for high-risk transactions
- **User Lookup**: Search and analyze trust scores for any phone number or UPI ID
- **Comprehensive Investigation Tools**: Detailed transaction analysis with risk factors
- **Blockchain Anchoring**: Tamper-proof audit trails on blockchain
- **Customizable Thresholds**: Configurable risk parameters and notification settings

### For Public Users
- **Trust Score Lookup**: Check trust scores for phone numbers and UPI IDs
- **Risk Assessment**: Detailed analysis of trustworthiness factors
- **Blockchain Verification**: Verify trust scores anchored on blockchain
- **Security Guidance**: Educational content about UPI fraud prevention

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  Node.js Backend │    │  Python ML API  │
│   (Vite + TS)   │◄──►│  (Express + PG)  │◄──►│  (FastAPI)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   WebSocket     │    │   PostgreSQL    │    │   LightGBM      │
│   Notifications │    │   Database      │    │   + SHAP        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   Blockchain    │
                       │   (Ethereum)    │
                       │   Smart Contract│
                       └─────────────────┘
```

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js, PostgreSQL, WebSocket
- **ML Pipeline**: Python, FastAPI, LightGBM, SHAP, pandas
- **Blockchain**: Solidity, Hardhat, ethers.js
- **Infrastructure**: Docker, GitHub Actions, Prometheus, Grafana

## 📋 Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- PostgreSQL 14+
- Docker (optional)
- Ethereum wallet for blockchain anchoring

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/your-org/ai-upi-fraud-detection.git
cd ai-upi-fraud-detection
```

### 2. Install Dependencies
```bash
# Frontend
npm install

# Backend (if separate)
cd backend && npm install

# ML Server (if separate)
cd ml-server && pip install -r requirements.txt
```

### 3. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Configure environment variables
# - Database connection
# - Blockchain RPC URL and private key
# - ML model server URL
# - WebSocket configuration
```

### 4. Database Setup
```bash
# Run migrations
npm run migrate

# Seed test data (optional)
npm run seed
```

### 5. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔐 Authentication & Access

### Demo Credentials

**Security Investigators:**
- Phone: Any 10-digit number
- OTP: `123456`
- Access: Full fraud detection dashboard

**Public Users:**
- Phone: Any 10-digit number  
- OTP: `654321`
- Access: Trust score lookup only

## 📊 Usage Guide

### For Security Investigators

1. **Dashboard Overview**
   - Monitor real-time transaction statistics
   - View recent security alerts
   - Track fraud prevention metrics

2. **Transaction Monitoring**
   - Browse all transactions with filtering
   - Click any transaction for detailed analysis
   - View AI model explanations and risk factors

3. **User Lookup**
   - Search by phone number or UPI ID
   - View comprehensive trust profiles
   - Check blockchain anchor status

4. **Settings Configuration**
   - Adjust risk thresholds
   - Configure notification preferences
   - Set up blockchain anchoring parameters

### For Public Users

1. **Trust Score Lookup**
   - Enter phone number (10 digits) or UPI ID
   - View trust score and risk assessment
   - Check blockchain verification status

2. **Understanding Results**
   - Green (80-100): Highly trustworthy
   - Yellow (60-79): Moderate risk
   - Orange (40-59): Higher risk
   - Red (0-39): High risk - exercise caution

## 🔒 Security Features

### Data Protection
- **PII Masking**: All personally identifiable information is masked
- **Encryption**: Data encrypted in transit and at rest
- **Access Control**: Role-based authentication and authorization
- **Audit Trails**: Complete transaction and access logging

### Fraud Detection
- **Real-time Scoring**: Sub-second ML inference
- **Explainable AI**: SHAP values for model transparency
- **Behavioral Analysis**: Device fingerprinting and velocity checks
- **Risk Thresholds**: Configurable alerting levels

### Blockchain Anchoring
- **Tamper-proof Records**: Critical data anchored on blockchain
- **Verification**: Public verification of trust scores
- **Gas Optimization**: Efficient smart contract design
- **Privacy**: Only hashed digests stored on-chain

## 🧪 Testing

### Run Tests
```bash
# Frontend tests
npm run test

# Backend tests
npm run test:backend

# ML model tests
npm run test:ml

# Smart contract tests
npm run test:contracts
```

### Test Coverage
- Unit tests for all components
- Integration tests for API endpoints
- ML model validation tests
- Smart contract security tests

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Docker Deployment
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d
```

### Environment Variables
```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/upi_fraud

# Blockchain
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/your-key
PRIVATE_KEY=your-private-key
CONTRACT_ADDRESS=0x...

# ML Server
ML_SERVER_URL=http://localhost:8000

# WebSocket
WS_PORT=4000
```

## 📈 Monitoring & Metrics

### Key Metrics
- **Detection Rate**: Percentage of fraud caught
- **False Positive Rate**: Legitimate transactions flagged
- **Response Time**: ML inference latency
- **System Uptime**: Service availability

### Dashboards
- Grafana dashboards for system metrics
- Prometheus metrics collection
- Real-time alerting for system issues

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### Code Standards
- TypeScript for type safety
- ESLint and Prettier for code formatting
- Comprehensive test coverage
- Security-first development practices

## 📚 API Documentation

### REST Endpoints
- `POST /api/score` - Score a transaction
- `GET /api/transactions` - List transactions
- `GET /api/transaction/:id` - Get transaction details
- `POST /api/report` - Report fraud
- `POST /api/anchor/batch` - Anchor data to blockchain

### WebSocket Events
- `high-risk-transaction` - Real-time fraud alerts
- `system-status` - System health updates

## 🔧 Configuration

### Risk Thresholds
```javascript
{
  highRiskScore: 40,      // Transactions below this score are high risk
  criticalRiskScore: 20,  // Transactions below this score are critical
  velocityThreshold: 5,   // Max transactions per hour
  amountThreshold: 50000  // High-value transaction threshold (₹)
}
```

### ML Model Parameters
- **Features**: 15+ behavioral and transactional features
- **Algorithm**: LightGBM with SHAP explanations
- **Retraining**: Weekly with new labeled data
- **Drift Detection**: Automated model performance monitoring

## 🆘 Troubleshooting

### Common Issues

1. **WebSocket Connection Failed**
   - Check WS_PORT configuration
   - Verify firewall settings
   - Ensure backend server is running

2. **ML Model Not Responding**
   - Check ML_SERVER_URL configuration
   - Verify Python dependencies
   - Check model file exists

3. **Blockchain Anchoring Failed**
   - Verify PRIVATE_KEY and RPC_URL
   - Check contract address
   - Ensure sufficient gas balance

### Support
- Create GitHub issues for bugs
- Check documentation wiki
- Contact security team for urgent issues

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This system is for educational and demonstration purposes. For production use:
- Conduct thorough security audits
- Comply with local regulations (RBI, NPCI guidelines)
- Implement proper key management
- Set up comprehensive monitoring
- Regular security assessments

## 🙏 Acknowledgments

- NPCI for UPI specifications
- OpenAI for AI/ML guidance
- Ethereum community for blockchain standards
- React and Node.js communities

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Maintainer**: AI UPI Security Team