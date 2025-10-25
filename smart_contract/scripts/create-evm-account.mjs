import { Client, AccountId, PrivateKey, AccountCreateTransaction, Hbar, TransferTransaction } from "@hashgraph/sdk";
import "dotenv/config";

// Create a new Hedera account with EVM alias for EVM operations
async function createEVMCompatibleAccount() {
  try {
    const accountId = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID);
    const privateKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY);

    console.log("Funding Account ID:", accountId.toString());

    // Create client
    const client = Client.forTestnet().setOperator(accountId, privateKey);
    console.log("Client created successfully");

    // Generate ECDSA keypair for the new account
    const ecdsaPrivateKey = PrivateKey.generateECDSA();
    const ecdsaPublicKey = ecdsaPrivateKey.publicKey;

    console.log("New ECDSA Private Key:", ecdsaPrivateKey.toString());
    console.log("New ECDSA Public Key:", ecdsaPublicKey.toString());
    console.log("New EVM Address:", ecdsaPublicKey.toEvmAddress());

    // Create new account with initial balance (without alias for now)
    const createAccountTx = new AccountCreateTransaction()
      .setKey(ecdsaPrivateKey.publicKey)
      .setInitialBalance(new Hbar(50)) // Fund with 50 HBAR
      .freezeWith(client);

    const signTx = await createAccountTx.sign(privateKey);
    const txResponse = await signTx.execute(client);
    const receipt = await txResponse.getReceipt(client);

    console.log("New account created:", receipt.accountId.toString());
    console.log("EVM Address:", ecdsaPublicKey.toEvmAddress());

    // Now try to transfer more HBAR to the new account
    const transferTx = new TransferTransaction()
      .addHbarTransfer(accountId, new Hbar(-25)) // Deduct from funding account
      .addHbarTransfer(receipt.accountId, new Hbar(25)) // Add to new account
      .freezeWith(client);

    const signTransferTx = await transferTx.sign(privateKey);
    const transferResponse = await signTransferTx.execute(client);
    const transferReceipt = await transferResponse.getReceipt(client);

    console.log("Transfer successful:", transferReceipt.status.toString());

    // Save the new account details
    console.log("\nAdd this to your .env file:");
    console.log(`HEDERA_ECDSA_PRIVATE_KEY=${ecdsaPrivateKey.toString()}`);
    console.log(`HEDERA_EVM_ADDRESS=${ecdsaPublicKey.toEvmAddress()}`);
    console.log(`HEDERA_NEW_ACCOUNT_ID=${receipt.accountId.toString()}`);

  } catch (error) {
    console.error("Error:", error);
  }
}

createEVMCompatibleAccount();