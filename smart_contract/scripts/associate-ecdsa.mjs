import { Client, AccountId, PrivateKey, AccountUpdateTransaction, Hbar } from "@hashgraph/sdk";
import "dotenv/config";

// Associate ECDSA key with existing Hedera account for EVM operations
async function associateECDSAKey() {
  try {
    const accountId = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID);
    const privateKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY);

    console.log("Account ID:", accountId.toString());

    // Create client
    const client = Client.forTestnet().setOperator(accountId, privateKey);
    console.log("Client created successfully");

    // Generate ECDSA keypair
    const ecdsaPrivateKey = PrivateKey.generateECDSA();
    const ecdsaPublicKey = ecdsaPrivateKey.publicKey;

    console.log("ECDSA Private Key:", ecdsaPrivateKey.toString());
    console.log("ECDSA Public Key:", ecdsaPublicKey.toString());
    console.log("ECDSA EVM Address:", ecdsaPublicKey.toEvmAddress());

    // Try to update the account to add the ECDSA key
    const transaction = new AccountUpdateTransaction()
      .setAccountId(accountId)
      .setKey(ecdsaPublicKey) // This might not work if account already has a key
      .freezeWith(client);

    const signTx = await transaction.sign(ecdsaPrivateKey);
    const txResponse = await signTx.execute(client);
    const receipt = await txResponse.getReceipt(client);

    console.log("Account update successful:", receipt.status.toString());

    // Save the ECDSA key for EVM use
    console.log("\nAdd this to your .env file:");
    console.log(`HEDERA_ECDSA_PRIVATE_KEY=${ecdsaPrivateKey.toString()}`);
    console.log(`HEDERA_EVM_ADDRESS=${ecdsaPublicKey.toEvmAddress()}`);

  } catch (error) {
    console.error("Error:", error);
  }
}

associateECDSAKey();