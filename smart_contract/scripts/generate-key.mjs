import { ethers } from "ethers";

// Generate a proper hex private key for Hedera EVM
const wallet = ethers.Wallet.createRandom();
console.log("Private Key:", wallet.privateKey);
console.log("Address:", wallet.address);

// Output for .env
console.log("\nAdd to .env:");
console.log(`HEDERA_ECDSA_PRIVATE_KEY=${wallet.privateKey}`);
console.log(`HEDERA_EVM_ADDRESS=${wallet.address}`);