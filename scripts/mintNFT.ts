import { ethers as hardhatEthers } from "hardhat";
import { ethers, formatEther, parseEther, JsonRpcProvider} from "ethers"; // For ethers v6
import { LandNFT } from "../typechain-types/index"; // Adjust the path as necessary
import * as dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

async function main() {
  const contractAddress = "0x9659FC45239362AAc07C3E3F3CD1B94E199675D1"; // LandNFT contract address

  // Set up the wallet using the private key from .env file
  const provider = new JsonRpcProvider(`https://rpc.testnet.soniclabs.com`);
  const wallet = new ethers.Wallet(process.env.SONIC_PRIVATE_KEY!, provider);

  // Attach to the LandNFT contract
  const LandNFT = await hardhatEthers.getContractFactory("LandNFT", wallet);
  const landNFT = await LandNFT.attach(contractAddress) as LandNFT;

  // Define the mint price (ensure it matches the price set in the contract)
  const mintPrice = await landNFT.mintPrice();
  const mintPriceInETH = formatEther(mintPrice);

  console.log(`Minting an NFT with a price of: ${formatEther(mintPrice)} ETH`);

  // Send the transaction to mint the NFT
  const tx = await landNFT.mint({
    value: mintPrice, // Sending the required ETH for minting
  });

  // Wait for the transaction to be mined
  const receipt = await tx.wait();

  // Extract the tokenId from the emitted event (Minted)
  if (!receipt) {
    console.error("Transaction receipt is null.");
    return;
  }
  const mintEvent = receipt.logs
    .map(log => landNFT.interface.parseLog(log))
    .find(parsedLog => parsedLog && parsedLog.name === "Minted");

  if (mintEvent) {
    const tokenId = mintEvent.args?.[1]; // tokenId should be the second argument in the event
    console.log(`Minted NFT with tokenId: ${tokenId}`);

    // Returning tokenId for further usage (e.g., importing into MetaMask)
    return tokenId;
  } else {
    console.error("Minting failed, no Minted event found.");
  }
}

// Execute the script
main()
  .then((tokenId) => {
    if (tokenId) {
      console.log(`You can now import tokenId ${tokenId} into MetaMask.`);
    }
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exitCode = 1;
  });
