import { ethers } from "ethers";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log("🚀 Deploying Transactions contract to Hedera testnet...");

  try {
    // Setup provider for Hedera
    const provider = new ethers.JsonRpcProvider("https://testnet.hashio.io/api");
    const wallet = new ethers.Wallet(process.env.HEDERA_ECDSA_PRIVATE_KEY || process.env.PRIVATE_KEY, provider);

    console.log("Deploying with account:", wallet.address);

    // Load contract artifact
    const artifactPath = path.join(__dirname, "../artifacts/contracts/Transactions.sol/Transactions.json");
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

    // Deploy contract with explicit gas settings for Hedera
    const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
    console.log("Creating deployment transaction...");

    // Hedera requires specific gas settings
    const deployTx = await factory.getDeployTransaction();
    deployTx.gasLimit = 5000000; // Higher gas limit for Hedera
    deployTx.gasPrice = ethers.parseUnits("600", "gwei"); // Hedera minimum gas price (~530+ gwei)

    console.log("Sending deployment transaction...");
    const tx = await wallet.sendTransaction(deployTx);
    console.log("Transaction sent:", tx.hash);

    console.log("Waiting for confirmation...");
    const receipt = await tx.wait();
    console.log("Transaction confirmed in block:", receipt.blockNumber);
    console.log("Gas used:", receipt.gasUsed?.toString());
    console.log("Status:", receipt.status);

    if (receipt.status === 0) {
      console.error("❌ Transaction failed!");
      console.log("Receipt:", receipt);
      process.exit(1);
    }

    // Get contract address - try receipt.contractAddress first, fallback to calculation
    let address;
    if (receipt.contractAddress) {
      address = receipt.contractAddress;
      console.log("Contract address from receipt:", address);
    } else {
      // Calculate address using transaction nonce
      address = ethers.getCreateAddress({
        from: wallet.address,
        nonce: tx.nonce
      });
      console.log("Contract address calculated:", address);
    }

    console.log("\n✅ Contract deployed successfully!");
    console.log("📍 Contract address:", address);
    console.log("🌐 Network: Hedera Testnet (Chain ID: 296)");
    console.log("🔗 Transaction hash:", tx.hash);
    console.log("\n📝 Next steps:");
    console.log("1. Update client/src/utils/constants.js with:");
    console.log(`   296: "${address}", // Hedera testnet`);
    console.log("2. Switch MetaMask to Hedera testnet");
    console.log("3. Test transfers with A2A messaging");
    console.log("\n✅ Contract deployed successfully!");
    console.log("📍 Contract address:", address);
    console.log("🌐 Network: Hedera Testnet (Chain ID: 296)");
    console.log("\n📝 Next steps:");
    console.log("1. Update client/src/utils/constants.js with:");
    console.log(`   296: "${address}", // Hedera testnet`);
    console.log("2. Switch MetaMask to Hedera testnet");
    console.log("3. Test transfers with A2A messaging");

  } catch (error) {
    console.error("❌ Deployment failed:", error.message);
    process.exit(1);
  }
}

main();