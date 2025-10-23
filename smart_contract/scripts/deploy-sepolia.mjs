import { ethers } from "ethers";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log("Deploying updated Transactions contract to Sepolia...");

  // Setup provider and wallet
  const providerUrl = process.env.ALCHEMY_API_URL || "https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY";
  console.log("Using provider URL:", providerUrl);

  const provider = new ethers.JsonRpcProvider(providerUrl);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log("Deploying with account:", wallet.address);

  try {
    const balance = await provider.getBalance(wallet.address);
    console.log("Account balance:", ethers.formatEther(balance), "ETH");

    if (balance === 0n) {
      console.log("\n❌ Account has 0 ETH. Please fund your account with Sepolia ETH first.");
      console.log("Get Sepolia ETH from: https://sepoliafaucet.com/");
      console.log("Your address:", wallet.address);
      process.exit(1);
    }
  } catch (error) {
    console.error("Error checking balance:", error.message);
    console.log("Continuing with deployment anyway...");
  }

  // Load contract artifact
  const artifactPath = path.join(
    __dirname,
    "../artifacts/contracts/Transactions.sol/Transactions.json"
  );
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

  // Deploy contract
  const factory = new ethers.ContractFactory(
    artifact.abi,
    artifact.bytecode,
    wallet
  );

  console.log("Deploying contract...");
  const transactions = await factory.deploy();
  console.log("Waiting for deployment confirmation...");
  await transactions.waitForDeployment();

  const address = await transactions.getAddress();

  console.log("\n✅ Transactions contract deployed to:", address);
  console.log("\n📝 Update this address in client/src/utils/constants.js:");
  console.log(`11155111: "${address}", // sepolia`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
