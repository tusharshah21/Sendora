# Crypto-transfer-web3# Crypto-transfer-web3



A full-stack decentralized application (DApp) for transferring Ethereum, built with React (frontend) and Solidity/Hardhat 3 (backend smart contract). This project showcases cutting-edge blockchain development practices and is optimized for the ETHOnline 2025 hackathon.A full-stack decentralized application (DApp) for transferring Ethereum, built with React (frontend) and Solidity/Hardhat 3 (backend smart contract). This project showcases cutting-edge blockchain development practices and is optimized for the ETHOnline 2025 hackathon.



------



## 🚀 **Hardhat 3 Features Showcased**## 🚀 **Hardhat 3 Features Showcased**



- **Rust-Powered Runtime**: Lightning-fast compilation and testing- **Rust-Powered Runtime**: Lightning-fast compilation and testing

- **ESM Modules**: Modern JavaScript with `"type": "module"`- **ESM Modules**: Modern JavaScript with `"type": "module"`

- **Multichain Support**: Deployed on Sepolia, Optimism Sepolia, Base Sepolia, and **Hedera Testnet**- **Multichain Support**: Deployed on Sepolia, Optimism Sepolia, Base Sepolia, and **Hedera Testnet**

- **Solidity Native Testing**: Fuzz testing with 256 runs and invariant checks- **Solidity Native Testing**: Fuzz testing with 256 runs and invariant checks

- **Advanced Gas Optimization**: Optimized smart contracts with payable transfers- **Advanced Gas Optimization**: Optimized smart contracts with payable transfers

- **Batch Transactions**: Send multiple transfers in a single transaction- **Batch Transactions**: Send multiple transfers in a single transaction

- **🤖 A2A Messaging**: Agent-to-agent communication protocol (Hedera integration)- **🤖 A2A Messaging**: Agent-to-agent communication protocol (Hedera integration)

- **🔐 Hedera Agent Kit**: Smart contract agents with negotiation capabilities- **🔐 Hedera Agent Kit**: Smart contract agents with negotiation capabilities



------



## Project Structure## Project Structure



``````

crypto-transfer-web3/crypto-transfer-web3/

││

├── client/                 # React frontend (Vite, TailwindCSS)├── client/                 # React frontend (Vite, TailwindCSS)

│   ├── src/│   ├── src/

│   │   ├── components/     # Reusable UI components│   │   ├── components/     # Reusable UI components

│   │   ├── context/        # React context for blockchain state│   │   ├── context/        # React context for blockchain state

│   │   ├── hooks/          # Custom React hooks│   │   ├── hooks/          # Custom React hooks

│   │   └── utils/          # Constants and utilities│   │   └── utils/          # Constants and utilities

│   └── package.json│   └── package.json

││

└── smart_contract/         # Hardhat 3 Ethereum project└── smart_contract/         # Hardhat 3 Ethereum project

    ├── contracts/          # Solidity smart contracts    ├── contracts/          # Solidity smart contracts

    ├── test/               # Solidity native tests (.t.sol)    ├── test/               # Solidity native tests (.t.sol)

    ├── scripts/            # Deployment scripts    ├── scripts/            # Deployment scripts

    ├── hardhat.config.js   # Hardhat 3 configuration    ├── hardhat.config.js   # Hardhat 3 configuration

    └── package.json    └── package.json

``````



------



## Features## Features



- **💰 Send Ethereum**: Transfer ETH to any address with messages and keywords- **💰 Send Ethereum**: Transfer ETH to any address with messages and keywords

- **📊 Transaction History**: View all past transactions on the blockchain- **📊 Transaction History**: View all past transactions on the blockchain

- **🎨 Giphy Integration**: Attach GIFs to transactions using keywords- **🎨 Giphy Integration**: Attach GIFs to transactions using keywords

- **🔗 MetaMask Integration**: Seamless wallet connection- **🔗 MetaMask Integration**: Seamless wallet connection

- **🌐 Multichain Support**: Works across multiple testnets (Ethereum + Hedera)- **🌐 Multichain Support**: Works across multiple testnets (Ethereum + Hedera)

- **📦 Batch Transfers**: Send to multiple addresses simultaneously- **📦 Batch Transfers**: Send to multiple addresses simultaneously

- **⚡ Fast Testing**: Hardhat 3's Rust runtime with fuzz testing- **⚡ Fast Testing**: Hardhat 3's Rust runtime with fuzz testing

- **🎯 Modern UI**: Responsive design with TailwindCSS- **🎯 Modern UI**: Responsive design with TailwindCSS

- **🤖 A2A Agent Messaging**: Smart contract agents negotiate transfers- **🤖 A2A Agent Messaging**: Smart contract agents negotiate transfers

- **🏛️ Hedera Integration**: EVM-compatible transactions with agent coordination- **🏛️ Hedera Integration**: EVM-compatible transactions with agent coordination



------



## Getting Started## Getting Started



### Prerequisites### Prerequisites



- Node.js 18+- Node.js 18+

- MetaMask wallet- MetaMask wallet

- Git- Git



### 1. Clone the Repository### 1. Clone the Repository



```sh```sh

git clone https://github.com/tusharshah21/Crypto-transfer-web3.gitgit clone https://github.com/tusharshah21/Crypto-transfer-web3.git

cd Crypto-transfer-web3cd Crypto-transfer-web3

``````



------



### 2. Smart Contract Setup### 2. Smart Contract Setup (`smart_contract`)



#### Install Dependencies#### Install Dependencies



```sh```sh

cd smart_contractcd smart_contract

npm installnpm install

``````



#### Configure Environment#### Configure Environment



Copy the example environment file and fill in your credentials:Copy the example environment file and fill in your credentials:



```sh```sh

cp .env.example .envcp .env.example .env

``````



Edit `.env` with your actual values:Edit `.env` with your actual values:



```env```env

# Sepolia network configuration# Sepolia network configuration

ALCHEMY_API_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEYALCHEMY_API_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY

PRIVATE_KEY=your_private_key_without_0x_prefixPRIVATE_KEY=your_private_key_without_0x_prefix



# Optional: Additional networks# Optional: Additional networks

OPTIMISM_SEPOLIA_URL=https://sepolia.optimism.ioOPTIMISM_SEPOLIA_URL=https://sepolia.optimism.io

BASE_SEPOLIA_URL=https://sepolia.base.orgBASE_SEPOLIA_URL=https://sepolia.base.org

``````



#### Get API Keys#### Get API Keys



1. **Alchemy API Key**: Sign up at [Alchemy](https://www.alchemy.com/) and create a Sepolia app1. **Alchemy API Key**: Sign up at [Alchemy](https://www.alchemy.com/) and create a Sepolia app

2. **Private Key**: Export from MetaMask (never commit this to git!)2. **Private Key**: Export from MetaMask (never commit this to git!)



#### Compile Contracts#### Compile Contracts



```sh```sh

npx hardhat compilenpx hardhat compile

``````



#### Run Tests#### Run Tests



```sh```sh

npx hardhat testnpx hardhat test

``````



#### Deploy to Networks#### Deploy to Networks



**Sepolia:****Sepolia:**

```sh

```shnpx hardhat run scripts/deploy-sepolia.mjs --network sepolia

npx hardhat run scripts/deploy-sepolia.mjs --network sepolia```

```

**Local Hardhat Network:**

**Local Hardhat Network:**```sh

npx hardhat node

```shnpx hardhat run scripts/deploy.js --network localhost

npx hardhat node```

npx hardhat run scripts/deploy.js --network localhost

```---



---### 3. Frontend Setup (`client`)



### 3. Frontend Setup#### Install Dependencies



#### Install Dependencies```sh

cd ../client

```shnpm install

cd ../client```

npm install

```#### Configure Environment



#### Configure EnvironmentCreate a `.env.local` file in `client/`:



Create a `.env.local` file in `client/`:```env

VITE_GIPHY_API=your_giphy_api_key

```env```

VITE_GIPHY_API=your_giphy_api_key

```#### Update Contract Addresses



#### Update Contract AddressesAfter deployment, the contract addresses are already configured in [`src/utils/constants.js`](client/src/utils/constants.js) for multiple networks.



After deployment, the contract addresses are already configured in [`src/utils/constants.js`](client/src/utils/constants.js) for multiple networks.#### Start the Frontend



#### Start the Frontend```sh

npm run dev

```sh```

npm run dev

```Visit [http://localhost:5173](http://localhost:5173) in your browser.



Visit [http://localhost:5173](http://localhost:5173) in your browser.---



---## Network Configuration



## Network ConfigurationThe DApp supports multiple testnets:



The DApp supports multiple testnets:| Network | Chain ID | Status | Contract Address |

|---------|----------|--------|------------------|

| Network | Chain ID | Status | Contract Address || Sepolia | 11155111 | ✅ Deployed | `0xFF0016a7E2fD90169c5eF2c5dD266a46cc8dAC4B` |

|---------|----------|--------|------------------|| Hardhat Local | 31337 | ✅ Ready | `0x5FbDB2315678afecb367f032d93F642f64180aa3` |

| Sepolia | 11155111 | ✅ Deployed | `0xFF0016a7E2fD90169c5eF2c5dD266a46cc8dAC4B` || Optimism Sepolia | 11155420 | 🔄 Placeholder | `0x...` |

| Hardhat Local | 31337 | ✅ Ready | `0x5FbDB2315678afecb367f032d93F642f64180aa3` || Base Sepolia | 84532 | 🔄 Placeholder | `0x...` |

| Optimism Sepolia | 11155420 | 🔄 Placeholder | `0x...` || **Hedera Testnet** | **296** | ✅ **Deployed** | `0x94BE308f88931A9F11FD87504A3c4FbbE57AA86B` |

| Base Sepolia | 84532 | 🔄 Placeholder | `0x...` |

| **Hedera Testnet** | **296** | ✅ **Deployed** | `0x1a1A6fFd5D6672bfF672EF51c8Ffaad0EA0AA0Eb` |---



---## 🏛️ **Hedera Integration & A2A Messaging**



## 🏛️ Hedera Integration & A2A MessagingThis project integrates Hedera's Agent Kit and A2A (Agent-to-Agent) messaging protocol for ETHOnline 2025 sponsor prize eligibility.



This project integrates Hedera's Agent Kit and A2A (Agent-to-Agent) messaging protocol for ETHOnline 2025 sponsor prize eligibility.### Hedera Features



### Hedera Features- **🤖 Smart Contract Agents**: TransferAgent class handles transaction negotiation

- **💬 A2A Messaging**: Agents communicate using Hedera Consensus Service

- **🤖 Smart Contract Agents**: TransferAgent class handles transaction negotiation- **🔐 ECDSA Keys**: EVM-compatible key management for Hedera testnet

- **💬 A2A Messaging**: Agents communicate using Hedera Consensus Service- **⚡ Fast Transactions**: Hedera's high-performance distributed ledger

- **🔐 ECDSA Keys**: EVM-compatible key management for Hedera testnet- **💰 $10,000 Prize**: Eligible for Hedera Agent Kit & A2A sponsor prize

- **⚡ Fast Transactions**: Hedera's high-performance distributed ledger

- **💰 $10,000 Prize**: Eligible for Hedera Agent Kit & A2A sponsor prize### Hedera Setup



### Hedera Setup#### 1. Create Hedera Testnet Account



#### 1. Create Hedera Testnet Account1. Visit [Hedera Developer Portal](https://portal.hedera.com/)

2. Create a testnet account (get 1000 ℏ free test HBAR)

1. Visit [Hedera Developer Portal](https://portal.hedera.com/)3. Note your Account ID (format: `0.0.XXXXXXX`)

2. Create a testnet account (get 1000 ℏ free test HBAR)4. Export your ECDSA private key

3. Note your Account ID (format: `0.0.XXXXXXX`)

4. Export your ECDSA private key#### 2. Configure Environment



#### 2. Configure EnvironmentUpdate `smart_contract/.env`:



Update `smart_contract/.env`:```env

# Hedera Testnet - ECDSA keypair for EVM operations

```envHEDERA_ECDSA_PRIVATE_KEY=0x15cb0e7eb74af075bb2af4248553964e74f3d6e480b94c1afa67777f7a66f69d

# Hedera Testnet - ECDSA keypair for EVM operationsHEDERA_EVM_ADDRESS=0x1576b44dfc51193d04e648bebca60f0b866b3921

HEDERA_ECDSA_PRIVATE_KEY=0x15cb0e7eb74af075bb2af4248553964e74f3d6e480b94c1afa67777f7a66f69d```

HEDERA_EVM_ADDRESS=0x1576b44dfc51193d04e648bebca60f0b866b3921

```#### 3. Deploy to Hedera



#### 3. Deploy to Hedera```sh

cd smart_contract

```shnpx hardhat run scripts/deploy-hedera.mjs --network hedera

cd smart_contract```

npx hardhat run scripts/deploy-hedera.mjs --network hedera

```#### 4. Configure MetaMask for Hedera



#### 4. Configure MetaMask for HederaAdd Hedera testnet to MetaMask:

- **Network Name**: Hedera Testnet

Add Hedera testnet to MetaMask:- **RPC URL**: `https://testnet.hashio.io/api`

- **Chain ID**: `296`

- **Network Name**: Hedera Testnet- **Currency Symbol**: `HBAR`

- **RPC URL**: `https://testnet.hashio.io/api`- **Block Explorer**: `https://hashscan.io/testnet`

- **Chain ID**: `296`

- **Currency Symbol**: `HBAR`#### 5. Test A2A Messaging

- **Block Explorer**: `https://hashscan.io/testnet`

1. Connect MetaMask to Hedera testnet

#### 5. Test A2A Messaging2. Select "Hedera Testnet" in the DApp

3. Send a transfer - observe agent negotiation in browser console

1. Connect MetaMask to Hedera testnet4. Check transaction on [HashScan](https://hashscan.io/testnet)

2. Select "Hedera Testnet" in the DApp

3. Send a transfer - observe agent negotiation in browser console### A2A Agent Architecture

4. Check transaction on [HashScan](https://hashscan.io/testnet)

```

### A2A Agent ArchitectureUser Request → TransferAgent.negotiateTransfer()

    ↓

```Agent Coordination → Hedera Consensus Service

User Request → TransferAgent.negotiateTransfer()    ↓

    ↓Smart Contract → Execute Transfer

Agent Coordination → Hedera Consensus Service    ↓

    ↓Event Logging → Transaction Recorded

Smart Contract → Execute Transfer```

    ↓

Event Logging → Transaction Recorded### Hedera Agent Kit Implementation

```

- **TransferAgent Class**: Handles transfer negotiation logic

### Hedera Agent Kit Implementation- **Message Protocol**: Structured A2A communication

- **Consensus Integration**: Uses Hedera's fast consensus service

- **TransferAgent Class**: Handles transfer negotiation logic- **Fallback Handling**: Graceful degradation if agent fails

- **Message Protocol**: Structured A2A communication

- **Consensus Integration**: Uses Hedera's fast consensus service---

- **Fallback Handling**: Graceful degradation if agent fails

## Smart Contract Details

---

### `Transactions.sol`

## Smart Contract Details

- **Payable Transfers**: Actual ETH transfers with `payable` modifier

### `Transactions.sol`- **Batch Operations**: `batchTransfer()` function for multiple recipients

- **Chain Tracking**: Records chainId for each transaction

- **Payable Transfers**: Actual ETH transfers with `payable` modifier- **Event Logging**: Comprehensive transaction events

- **Batch Operations**: `batchTransfer()` function for multiple recipients- **Gas Optimized**: Efficient Solidity patterns

- **Chain Tracking**: Records chainId for each transaction

- **Event Logging**: Comprehensive transaction events### Testing

- **Gas Optimized**: Efficient Solidity patterns

- **Unit Tests**: Basic functionality testing

### Testing- **Fuzz Tests**: 256 random inputs per test

- **Invariant Tests**: Property-based testing

- **Unit Tests**: Basic functionality testing- **Gas Reporting**: Performance optimization

- **Fuzz Tests**: 256 random inputs per test

- **Invariant Tests**: Property-based testing---

- **Gas Reporting**: Performance optimization

## Useful Commands

---

### Smart Contract

## Useful Commands

```sh

### Smart Contract# Compile contracts

npx hardhat compile

```sh

# Compile contracts# Run all tests

npx hardhat compilenpx hardhat test



# Run all tests# Run specific test file

npx hardhat testnpx hardhat test test/Transactions.t.sol



# Run specific test file# Start local node

npx hardhat test test/Transactions.t.solnpx hardhat node



# Start local node# Deploy to Sepolia

npx hardhat nodenpx hardhat run scripts/deploy-sepolia.mjs --network sepolia



# Deploy to Sepolia# Deploy to Hedera testnet

npx hardhat run scripts/deploy-sepolia.mjs --network sepolianpx hardhat run scripts/deploy-hedera.mjs --network hedera



# Deploy to Hedera testnet# Check migration status

npx hardhat run scripts/deploy-hedera.mjs --network hederanpx hardhat run scripts/check-status.mjs

```

# Check migration status

npx hardhat run scripts/check-status.mjs### Client

```

```sh

### Client# Start development server

npm run dev

```sh

# Start development server# Build for production

npm run devnpm run build



# Build for production# Preview production build

npm run buildnpm run preview

```

# Preview production build

npm run preview---

```

## Development Workflow

---

1. **Local Development**:

## Development Workflow   - Start Hardhat node: `npx hardhat node`

   - Deploy locally: `npx hardhat run scripts/deploy.js --network localhost`

1. **Local Development**:   - Start frontend: `npm run dev`

   - Start Hardhat node: `npx hardhat node`

   - Deploy locally: `npx hardhat run scripts/deploy.js --network localhost`2. **Testing**:

   - Start frontend: `npm run dev`   - Run tests: `npx hardhat test`

   - Check gas usage: `npx hardhat test --gas`

2. **Testing**:

   - Run tests: `npx hardhat test`3. **Deployment**:

   - Check gas usage: `npx hardhat test --gas`   - Test on Sepolia: Deploy and test with real ETH

   - Update contract addresses in constants.js

3. **Deployment**:

   - Test on Sepolia: Deploy and test with real ETH---

   - Update contract addresses in constants.js

## Tech Stack

---

- **Frontend**: React 17, Vite 2.7.2, TailwindCSS

## Tech Stack- **Backend**: Solidity 0.8.19, Hardhat 3.0.7

- **Blockchain**: Ethereum (Sepolia testnet), **Hedera (Testnet)**

- **Frontend**: React 17, Vite 2.7.2, TailwindCSS- **Libraries**: ethers.js 5.5.1, **@hashgraph/sdk**, MetaMask

- **Backend**: Solidity 0.8.19, Hardhat 3.0.7- **Testing**: Foundry (forge-std), Hardhat Chai

- **Blockchain**: Ethereum (Sepolia testnet), **Hedera (Testnet)**- **Agent Protocol**: A2A Messaging, Hedera Consensus Service

- **Libraries**: ethers.js 5.5.1, **@hashgraph/sdk**, MetaMask

- **Testing**: Foundry (forge-std), Hardhat Chai---

- **Agent Protocol**: A2A Messaging, Hedera Consensus Service

## Contributing

---

1. Fork the repository

## Contributing2. Create a feature branch: `git checkout -b feature/amazing-feature`

3. Commit changes: `git commit -m 'Add amazing feature'`

1. Fork the repository4. Push to branch: `git push origin feature/amazing-feature`

2. Create a feature branch: `git checkout -b feature/amazing-feature`5. Open a Pull Request

3. Commit changes: `git commit -m 'Add amazing feature'`

4. Push to branch: `git push origin feature/amazing-feature`---

5. Open a Pull Request

## License

---

MIT License - see the [LICENSE](LICENSE) file for details.

## License

---

MIT License - see the [LICENSE](LICENSE) file for details.

## Author

---

**Tushar Shah**

## Author- Email: tusharkumarshah14394@gmail.com

- GitHub: [@tusharshah21](https://github.com/tusharshah21)

**Tushar Shah**- ETHOnline 2025 Participant



- Email: tusharkumarshah14394@gmail.com---

- GitHub: [@tusharshah21](https://github.com/tusharshah21)

- ETHOnline 2025 Participant## Acknowledgments



---- ETHOnline 2025 Hackathon

- Hardhat Team for the amazing v3 release

## Acknowledgments- OpenZeppelin for security best practices

- Alchemy for reliable RPC endpoints

- ETHOnline 2025 Hackathon#   S e n d o r a 

- Hardhat Team for the amazing v3 release 

- OpenZeppelin for security best practices 
- Alchemy for reliable RPC endpoints
- Hedera for Agent Kit & A2A protocol support
