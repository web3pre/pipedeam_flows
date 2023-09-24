// To use previous step data, pass the `steps` object to the run() function
import { Client } from "@xmtp/xmtp-js";
import { Wallet } from "ethers";

export default defineComponent({
  async run({ steps, $ }) {
    // You'll want to replace this with a wallet from your application
    const wallet = Wallet.createRandom();
    // Create the client with your wallet. This will connect to the XMTP development network by default
    const xmtp = await Client.create(wallet, { env: "production" });
    // Start a conversation with XMTP
    const conversation = await xmtp.conversations.newConversation(
      "0x44295F9F7157f3078B91f5aed8521F167D725026",
    );
    // Load all messages in the conversation
    const messages = await conversation.messages();
    // Send a message
    await conversation.send("GM! You've been scheduled to meet with a qualified person to process your accredited investor status");
    // // Listen for new messages in the conversation
    // for await (const message of await conversation.streamMessages()) {
    //   console.log(`[${message.senderAddress}]: ${message.content}`);
    // }
    // Return data to use it in future steps
    return steps.trigger.event
  },
})