import { Client, PrivateKey, TransferTransaction, Hbar, TopicCreateTransaction, TopicMessageSubmitTransaction, TopicMessageQuery } from "@hashgraph/sdk";

// Initialize Hedera client
const client = Client.forTestnet();
client.setOperator(
  import.meta.env.VITE_HEDERA_ACCOUNT_ID,
  PrivateKey.fromString(import.meta.env.VITE_HEDERA_PRIVATE_KEY)
);

// A2A Message Protocol
class A2AMessage {
  constructor(from, to, type, content) {
    this.from = from;
    this.to = to;
    this.type = type; // 'negotiation', 'confirmation', 'execution'
    this.content = content;
    this.timestamp = new Date().toISOString();
    this.id = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Basic transfer agent with A2A messaging
export class TransferAgent {
  constructor(onMessageCallback = null) {
    this.name = "Sendora Transfer Agent";
    this.description = "An AI agent for negotiating and executing transfers on Hedera";
    this.topicId = "0.0.123456"; // Pre-created topic ID for demo (replace with actual)
    this.messages = new Map(); // Store received messages
    this.onMessageCallback = onMessageCallback; // Callback for UI updates
    this.a2aInitialized = false;
  }

  // Initialize A2A topic for messaging
  async initializeA2A() {
    if (this.a2aInitialized) return this.topicId;

    try {
      console.log("Initializing A2A messaging topic...");

      // For demo purposes, we'll use a pre-created topic to avoid transaction issues
      // In production, you'd create a new topic like this:
      /*
      const topicTx = await new TopicCreateTransaction()
        .setTopicMemo("Sendora Transfer Agent A2A Channel")
        .setAdminKey(client.operatorPublicKey)
        .setSubmitKey(client.operatorPublicKey)
        .execute(client);

      const receipt = await topicTx.getReceipt(client);
      this.topicId = receipt.topicId;
      */

      // Using a placeholder topic ID for now
      this.topicId = "0.0.123456"; // Replace with actual topic ID
      console.log("A2A topic set:", this.topicId);

      this.a2aInitialized = true;

      // Start listening for messages (commented out for demo)
      // this.listenForMessages();

      return this.topicId;
    } catch (error) {
      console.error("Failed to initialize A2A:", error);
      // Fallback: continue without A2A for now
      this.topicId = null;
      return null;
    }
  }

  // Listen for incoming A2A messages (optional for demo)
  async listenForMessages() {
    if (!this.topicId || this.topicId === "0.0.123456") return;

    try {
      const query = new TopicMessageQuery()
        .setTopicId(this.topicId)
        .setStartTime(new Date(Date.now() - 60000)) // Last minute
        .subscribe(client, (message) => {
          try {
            const msgData = JSON.parse(message.contents.toString());
            console.log("Received A2A message:", msgData);

            if (msgData.to === this.name || msgData.to === "all") {
              this.messages.set(msgData.id, msgData);
              this.handleIncomingMessage(msgData);
            }
          } catch (error) {
            console.error("Error parsing A2A message:", error);
          }
        });
    } catch (error) {
      console.error("Failed to listen for messages:", error);
    }
  }

  // Send A2A message to another agent (simplified for demo)
  async sendA2AMessage(toAgent, type, content) {
    if (!this.topicId) {
      await this.initializeA2A();
    }

    const message = new A2AMessage(this.name, toAgent, type, content);

    try {
      if (this.topicId && this.topicId !== "0.0.123456") {
        // Real Hedera messaging (when topic is created)
        const messageTx = await new TopicMessageSubmitTransaction()
          .setTopicId(this.topicId)
          .setMessage(JSON.stringify(message))
          .execute(client);

        await messageTx.getReceipt(client);
      }

      console.log("A2A message sent:", message);

      // Simulate receiving the message for demo
      if (toAgent === this.name) {
        setTimeout(() => this.handleIncomingMessage(message), 100);
      }

      return message;
    } catch (error) {
      console.error("Failed to send A2A message:", error);
      // Continue without A2A for demo
      return message;
    }
  }

  // Handle incoming A2A messages
  async handleIncomingMessage(message) {
    // Store message
    this.messages.set(message.id, message);

    // Notify UI
    if (this.onMessageCallback) {
      this.onMessageCallback(message);
    }

    switch (message.type) {
      case 'negotiation':
        console.log("Handling negotiation request from:", message.from);
        // Auto-confirm for demo (in real scenario, this could involve user approval)
        await this.sendA2AMessage(message.from, 'confirmation', {
          originalMessageId: message.id,
          status: 'confirmed',
          recipient: message.content.recipient,
          amount: message.content.amount
        });
        break;

      case 'confirmation':
        console.log("Received confirmation for transfer");
        // Could trigger execution here
        break;

      case 'execution':
        console.log("Transfer execution status:", message.content.status);
        break;

      default:
        console.log("Unknown message type:", message.type);
    }
  }

  // Enhanced negotiation with A2A messaging
  async negotiateTransfer(recipient, amount, message) {
    console.log(`Agent negotiating transfer: ${amount} HBAR to ${recipient} with message: ${message}`);

    // Send A2A negotiation message (to self for demo, but could be to other agents)
    const a2aMessage = await this.sendA2AMessage("Sendora Transfer Agent", 'negotiation', {
      recipient,
      amount,
      message,
      action: 'transfer_request'
    });

    return {
      status: "negotiated",
      recipient,
      amount,
      message,
      timestamp: new Date().toISOString(),
      agent: this.name,
      a2aMessageId: a2aMessage.id
    };
  }

  // Execute transfer on Hedera
  async executeTransfer(recipient, amount) {
    try {
      console.log(`Executing transfer: ${amount} HBAR to ${recipient}`);

      const transferTx = new TransferTransaction()
        .addHbarTransfer(client.operatorAccountId, new Hbar(-amount)) // Deduct from sender
        .addHbarTransfer(recipient, new Hbar(amount)); // Add to recipient

      const txResponse = await transferTx.execute(client);
      const receipt = await txResponse.getReceipt(client);

      console.log("Transfer successful:", receipt.status.toString());

      // Send A2A execution confirmation
      await this.sendA2AMessage("Sendora Transfer Agent", 'execution', {
        transactionId: txResponse.transactionId.toString(),
        recipient,
        amount,
        status: 'completed'
      });

      return { success: true, transactionId: txResponse.transactionId.toString() };
    } catch (error) {
      console.error("Transfer failed:", error);

      // Send A2A failure notification
      await this.sendA2AMessage("Sendora Transfer Agent", 'execution', {
        recipient,
        amount,
        status: 'failed',
        error: error.message
      });

      return { success: false, error: error.message };
    }
  }
}

// Export instance
export const transferAgent = new TransferAgent();