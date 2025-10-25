# Sendora Smart Contract (`smart_contract`)

This folder contains the Ethereum smart contract and Hardhat project for the Sendora DApp. The contract enables users to send ETH transactions with messages and keywords, and stores transaction history on-chain.

---

## Structure

```
smart_contract/
│
├── contracts/           # Solidity smart contracts (Transactions.sol)
├── scripts/             # Deployment scripts (deploy.js)
├── test/                # Contract tests (sample-test.js)
├── artifacts/           # Compiled contract artifacts (auto-generated)
├── cache/               # Hardhat cache (auto-generated)
├── .env                 # Environment variables (not committed)
├── hardhat.config.js    # Hardhat configuration
├── package.json         # Project dependencies and scripts
└── README.md            # This file
```

---

## Main Files

- [`contracts/Transactions.sol`](contracts/Transactions.sol): Main smart contract for ETH transfers and transaction history.
- [`scripts/deploy.js`](scripts/deploy.js): Script to deploy the contract to a network.
- [`test/sample-test.js`](test/sample-test.js): Example test for the contract using Hardhat and Chai.

---

## Getting Started

### 1. Install Dependencies

```sh
npm install
```

### 2. Configure Environment

Create a `.env` file in this folder with your Alchemy Sepolia URL and wallet private key:

```
ALCHEMY_API_URL=YOUR_ALCHEMY_SEPOLIA_URL
PRIVATE_KEY=YOUR_WALLET_PRIVATE_KEY
```

### 3. Compile Contracts

```sh
npx hardhat compile
```

### 4. Run Tests

```sh
npx hardhat test
```

### 5. Deploy to Sepolia Testnet

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

---

## Useful Hardhat Commands

- List accounts: `npx hardhat accounts`
- Compile contracts: `npx hardhat compile`
- Clean artifacts: `npx hardhat clean`
- Run tests: `npx hardhat test`
- Start local node: `npx hardhat node`
- Deploy contract: `npx hardhat run scripts/deploy.js --network sepolia`

---

## Requirements

- Node.js (v14 or higher recommended)
- Alchemy account for Sepolia endpoint
- Ethereum wallet private key (for deployment)

---

## License

MIT
