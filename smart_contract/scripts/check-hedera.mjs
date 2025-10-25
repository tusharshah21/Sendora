import { Client, AccountId, PrivateKey, AccountInfoQuery } from "@hashgraph/sdk";
import "dotenv/config";

// Generate ECDSA keypair for Hedera EVM operations
async function generateECDSAKeypair() {
  console.log("Generating ECDSA keypair for Hedera EVM operations...");

  const ecdsaPrivateKey = PrivateKey.generateECDSA();
  const ecdsaPublicKey = ecdsaPrivateKey.publicKey;

  console.log("ECDSA Private Key:", ecdsaPrivateKey.toString());
  console.log("ECDSA Public Key:", ecdsaPublicKey.toString());
  console.log("ECDSA EVM Address:", ecdsaPublicKey.toEvmAddress());

  // Save to .env for deployment
  console.log("\nAdd this to your .env file:");
  console.log(`HEDERA_ECDSA_PRIVATE_KEY=${ecdsaPrivateKey.toString()}`);
  console.log(`HEDERA_EVM_ADDRESS=${ecdsaPublicKey.toEvmAddress()}`);

  return {
    privateKey: ecdsaPrivateKey,
    publicKey: ecdsaPublicKey,
    evmAddress: ecdsaPublicKey.toEvmAddress()
  };
}

generateECDSAKeypair();