import { ethers as hardhatEthers } from "hardhat";
import { ethers, formatEther, parseEther } from "ethers"; // For ethers v6
import { LandNFT } from "../typechain-types/index"; // Adjust the path as necessary

async function main() {
  const contractAddress = "0xdA7e33ea8758B84597BBE77C6E14796946e125d2"; // LandNFT contract address
  const LandNFT = await hardhatEthers.getContractFactory("LandNFT");

  // Attach to the already deployed contract
  const landNFT = await LandNFT.attach(contractAddress) as LandNFT;

  // Set the mint price to 0.1 ETH (in wei)
  const newMintPrice = parseEther("0.1"); // 0.1 ETH in wei
  const tx = await landNFT.setMintPrice(newMintPrice);
  await tx.wait(); // Wait for the transaction to be mined

  console.log("Mint price set to 0.1 ETH.");

  // Query the updated mint price
  const mintPrice = await landNFT.mintPrice();

  // Convert the mint price from wei to ETH
  const mintPriceInETH = formatEther(mintPrice);

  console.log(`Updated mint price: ${mintPriceInETH} ETH`);
}

// Execute the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error);
    process.exitCode = 1;
  });
