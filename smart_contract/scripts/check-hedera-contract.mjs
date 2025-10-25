import { ethers } from "ethers";
import "dotenv/config";

async function checkHederaContract() {
  try {
    console.log("🔍 Checking Hedera contract accessibility...");

    // Connect to Hedera
    const provider = new ethers.providers.JsonRpcProvider("https://testnet.hashio.io/api");
    console.log("✅ Connected to Hedera provider");

    // Check contract address
    const contractAddress = "0x8e16e28C591666Be310C5c81cec23838ada9Ac53";
    console.log("📄 Contract address:", contractAddress);

    // Load contract ABI
    const fs = await import("fs");
    const path = await import("path");
    const { fileURLToPath } = await import("url");

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const artifactPath = path.join(__dirname, "../artifacts/contracts/Transactions.sol/Transactions.json");
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
    console.log("📋 Contract ABI loaded");

    // Create contract instance (read-only)
    const contract = new ethers.Contract(contractAddress, artifact.abi, provider);
    console.log("✅ Contract instance created");

    // Test basic contract call
    try {
      const transactionCount = await contract.getTransactionCount();
      console.log("📊 Transaction count:", transactionCount.toString());
      console.log("✅ Contract is accessible and responding");
    } catch (error) {
      console.error("❌ Contract call failed:", error.message);
      return;
    }

    // Check if we can get the signer and balance
    const privateKey = process.env.HEDERA_ECDSA_PRIVATE_KEY;
    if (privateKey) {
      const wallet = new ethers.Wallet(privateKey, provider);
      const balance = await wallet.getBalance();
      console.log("💰 Wallet balance:", ethers.utils.formatEther(balance), "HBAR");
      console.log("🏦 Wallet address:", wallet.address);
    }

    console.log("🎉 Hedera contract check completed successfully!");

  } catch (error) {
    console.error("❌ Hedera contract check failed:", error);
  }
}

checkHederaContract();