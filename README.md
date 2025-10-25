# Crypto-transfer-web3

A full-stack decentralized application (DApp) for transferring Ethereum, built with React (frontend) and Solidity/Hardhat 3 (backend smart contract). This project showcases cutting-edge blockchain development practices and is optimized for the ETHOnline 2025 hackathon.

## 🚀 Hardhat 3 Features Showcased

- **Rust-Powered Runtime**: Lightning-fast compilation and testing
- **ESM Modules**: Modern JavaScript with `"type": "module"`
- **Multichain Support**: Deployed on Sepolia, Optimism Sepolia, Base Sepolia, and **Hedera Testnet**
- **Solidity Native Testing**: Fuzz testing with 256 runs and invariant checks
- **Advanced Gas Optimization**: Optimized smart contracts with payable transfers
- **Batch Transactions**: Send multiple transfers in a single transaction
- **🤖 A2A Messaging**: Agent-to-agent communication protocol (Hedera integration)
- **🔐 Hedera Agent Kit**: Smart contract agents with negotiation capabilities

## Project Structure

```
crypto-transfer-web3/
├── client/                 # React frontend (Vite, TailwindCSS)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context for blockchain state
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Constants and utilities
│   └── package.json
└── smart_contract/         # Hardhat 3 Ethereum project
    ├── contracts/          # Solidity smart contracts
    ├── test/               # Solidity native tests (.t.sol)
    ├── scripts/            # Deployment scripts
    ├── hardhat.config.js   # Hardhat 3 configuration
    └── package.json
```

## Features

- **💰 Send Ethereum**: Transfer ETH to any address with messages and keywords
- **📊 Transaction History**: View all past transactions on the blockchain
- **🎨 Giphy Integration**: Attach GIFs to transactions using keywords
- **🔗 MetaMask Integration**: Seamless wallet connection
- **🌐 Multichain Support**: Works across multiple testnets (Ethereum + Hedera)
- **📦 Batch Transfers**: Send to multiple addresses simultaneously
- **⚡ Fast Testing**: Hardhat 3's Rust runtime with fuzz testing
- **🎯 Modern UI**: Responsive design with TailwindCSS
- **🤖 A2A Agent Messaging**: Smart contract agents negotiate transfers
- **🏛️ Hedera Integration**: EVM-compatible transactions with agent coordination

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask wallet
- Git

### 1. Clone the Repository

```sh
git clone https://github.com/tusharshah21/Crypto-transfer-web3.git
cd Crypto-transfer-web3
```

### 2. Smart Contract Setup (`smart_contract`)

#### Install Dependencies

```sh
cd smart_contract
npm install
```

#### Configure Environment

Copy the example environment file and fill in your credentials:

```sh
cp .env.example .env
```

Edit `.env` with your actual values:

```env
# Sepolia network configuration
ALCHEMY_API_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY
PRIVATE_KEY=your_private_key_without_0x_prefix

# Optional: Additional networks
OPTIMISM_SEPOLIA_URL=https://sepolia.optimism.io
BASE_SEPOLIA_URL=https://sepolia.base.org
```

#### Get API Keys

1. **Alchemy API Key**: Sign up at [Alchemy](https://www.alchemy.com/) and create a Sepolia app
2. **Private Key**: Export from MetaMask (never commit this to git!)

#### Compile Contracts

```sh
npx hardhat compile
```

#### Run Tests

```sh
npx hardhat test
```

#### Deploy to Networks

**Sepolia:**

```sh
npx hardhat run scripts/deploy-sepolia.mjs --network sepolia
```

**Local Hardhat Network:**

```sh
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

### 3. Frontend Setup (`client`)

#### Install Dependencies

```sh
cd ../client
npm install
```

#### Configure Environment

Create a `.env.local` file in `client/`:

```env
VITE_GIPHY_API=your_giphy_api_key
```

#### Update Contract Addresses

After deployment, the contract addresses are already configured in [`src/utils/constants.js`](client/src/utils/constants.js) for multiple networks.

#### Start the Frontend

```sh
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Network Configuration

The DApp supports multiple testnets:

| Network | Chain ID | Status | Contract Address |
|---------|----------|--------|------------------|
| Sepolia | 11155111 | ✅ Deployed | `0xFF0016a7E2fD90169c5eF2c5dD266a46cc8dAC4B` |
| Hardhat Local | 31337 | ✅ Ready | `0x5FbDB2315678afecb367f032d93F642f64180aa3` |
| Optimism Sepolia | 11155420 | 🔄 Placeholder | `0x...` |
| Base Sepolia | 84532 | 🔄 Placeholder | `0x...` |
| **Hedera Testnet** | **296** | ✅ **Deployed** | `0x1a1A6fFd5D6672bfF672EF51c8Ffaad0EA0AA0Eb` |

## 🏛️ Hedera Integration & A2A Messaging

This project integrates Hedera's Agent Kit and A2A (Agent-to-Agent) messaging protocol for ETHOnline 2025 sponsor prize eligibility.

### Hedera Features

- **🤖 Smart Contract Agents**: TransferAgent class handles transaction negotiation
- **💬 A2A Messaging**: Agents communicate using Hedera Consensus Service
- **🔐 ECDSA Keys**: EVM-compatible key management for Hedera testnet
- **⚡ Fast Transactions**: Hedera's high-performance distributed ledger
- **💰 $10,000 Prize**: Eligible for Hedera Agent Kit & A2A sponsor prize

### Hedera Setup

#### 1. Create Hedera Testnet Account

1. Visit [Hedera Developer Portal](https://portal.hedera.com/)
2. Create a testnet account (get 1000 ℏ free test HBAR)
3. Note your Account ID (format: `0.0.XXXXXXX`)
4. Export your ECDSA private key

#### 2. Configure Environment

Update `smart_contract/.env`:

```env
# Hedera Testnet - ECDSA keypair for EVM operations
HEDERA_ECDSA_PRIVATE_KEY=0x15cb0e7eb74af075bb2af4248553964e74f3d6e480b94c1afa67777f7a66f69d
HEDERA_EVM_ADDRESS=0x1576b44dfc51193d04e648bebca60f0b866b3921
```

#### 3. Deploy to Hedera

```sh
cd smart_contract
npx hardhat run scripts/deploy-hedera.mjs --network hedera
```

#### 4. Configure MetaMask for Hedera

Add Hedera testnet to MetaMask:

- **Network Name**: Hedera Testnet
- **RPC URL**: `https://testnet.hashio.io/api`
- **Chain ID**: `296`
- **Currency Symbol**: `HBAR`
- **Block Explorer**: `https://hashscan.io/testnet`

#### 5. Test A2A Messaging

1. Connect MetaMask to Hedera testnet
2. Select "Hedera Testnet" in the DApp
3. Send a transfer - observe agent negotiation in browser console
4. Check transaction on [HashScan](https://hashscan.io/testnet)

### A2A Agent Architecture

```
User Request → TransferAgent.negotiateTransfer()
    ↓
Agent Coordination → Hedera Consensus Service
    ↓
Smart Contract → Execute Transfer
    ↓
Event Logging → Transaction Recorded
```

### Hedera Agent Kit Implementation

- **TransferAgent Class**: Handles transfer negotiation logic
- **Message Protocol**: Structured A2A communication
- **Consensus Integration**: Uses Hedera's fast consensus service
- **Fallback Handling**: Graceful degradation if agent fails

## Smart Contract Details

### `Transactions.sol`

- **Payable Transfers**: Actual ETH transfers with `payable` modifier
- **Batch Operations**: `batchTransfer()` function for multiple recipients
- **Chain Tracking**: Records chainId for each transaction
- **Event Logging**: Comprehensive transaction events
- **Gas Optimized**: Efficient Solidity patterns

### Testing

- **Unit Tests**: Basic functionality testing
- **Fuzz Tests**: 256 random inputs per test
- **Invariant Tests**: Property-based testing
- **Gas Reporting**: Performance optimization

## Useful Commands

### Smart Contract

```sh
# Compile contracts
npx hardhat compile

# Run all tests
npx hardhat test

# Run specific test file
npx hardhat test test/Transactions.t.sol

# Start local node
npx hardhat node

# Deploy to Sepolia
npx hardhat run scripts/deploy-sepolia.mjs --network sepolia

# Deploy to Hedera testnet
npx hardhat run scripts/deploy-hedera.mjs --network hedera

# Check migration status
npx hardhat run scripts/check-status.mjs
```

### Client

```sh
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development Workflow

1. **Local Development**:
   - Start Hardhat node: `npx hardhat node`
   - Deploy locally: `npx hardhat run scripts/deploy.js --network localhost`
   - Start frontend: `npm run dev`

2. **Testing**:
   - Run tests: `npx hardhat test`
   - Check gas usage: `npx hardhat test --gas`

3. **Deployment**:
   - Test on Sepolia: Deploy and test with real ETH
   - Update contract addresses in constants.js

## Tech Stack

- **Frontend**: React 17, Vite 2.7.2, TailwindCSS
- **Backend**: Solidity 0.8.19, Hardhat 3.0.7
- **Blockchain**: Ethereum (Sepolia testnet), **Hedera (Testnet)**
- **Libraries**: ethers.js 5.5.1, **@hashgraph/sdk**, MetaMask
- **Testing**: Foundry (forge-std), Hardhat Chai
- **Agent Protocol**: A2A Messaging, Hedera Consensus Service

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Tushar Shah**
- Email: tusharkumarshah14394@gmail.com
- GitHub: [@tusharshah21](https://github.com/tusharshah21)
- ETHOnline 2025 Participant

## Acknowledgments

- ETHOnline 2025 Hackathon
- Hardhat Team for the amazing v3 release
- OpenZeppelin for security best practices
- Alchemy for reliable RPC endpoints
- Hedera for Agent Kit & A2A protocol support
