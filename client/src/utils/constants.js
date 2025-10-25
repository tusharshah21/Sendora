import abi from "./Transactions.json";

export const contractAddresses = {
  31337: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // hardhat
  11155111: "0xFF0016a7E2fD90169c5eF2c5dD266a46cc8dAC4B", // sepolia
  11155420: "0x...", // optimism sepolia placeholder
  84532: "0x...", // base sepolia placeholder
  296: "0x1a1A6fFd5D6672bfF672EF51c8Ffaad0EA0AA0Eb", // hedera testnet - simplified, no validation against amount
};

export const contractABI = abi.abi;
