# AI UPI Fraud Detection with Blockchain Anchoring

Real-time UPI fraud detection system combining machine learning explainability with blockchain-anchored audit trails.

## Features

- **ML-Powered Fraud Scoring** — LightGBM model analyzing 15+ behavioral and transactional features
- **Explainable AI** — SHAP-based risk factor explanations for every fraud score
- **Real-Time Alerts** — WebSocket-driven notifications on the investigator dashboard
- **Blockchain Audit Trail** — Hashed trust-score digests anchored on Ethereum (no PII on-chain)
- **Production-Ready** — Role-based access, PII masking, Prometheus + Grafana monitoring

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React, TypeScript, Tailwind CSS, Recharts |
| **Backend API** | Node.js, Express.js, PostgreSQL, WebSocket |
| **ML Service** | Python, FastAPI, LightGBM, SHAP |
| **Blockchain** | Solidity, Hardhat, ethers.js, Ethereum |
| **DevOps** | Docker, GitHub Actions CI/CD, Prometheus, Grafana |

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│   React UI  │────▶│  Node.js API │────▶│  PostgreSQL DB  │
│  Dashboard  │◀────│  + WebSocket │     └─────────────────┘
└─────────────┘     └──────┬───────┘
                           │
                    ┌──────▼───────┐     ┌─────────────────┐
                    │  FastAPI ML  │     │  Ethereum Chain  │
                    │  LightGBM +  │────▶│  Trust Score     │
                    │  SHAP        │     │  Anchoring       │
                    └──────────────┘     └─────────────────┘
```

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+
- PostgreSQL
- MetaMask (for blockchain features)
- Docker (optional, for containerized setup)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kam-hq/upi-fraud-detection.git
   cd upi-fraud-detection
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. (Optional) Start the ML service:
   ```bash
   cd ml-service
   pip install -r requirements.txt
   python -m uvicorn main:app --reload
   ```

## License

MIT
