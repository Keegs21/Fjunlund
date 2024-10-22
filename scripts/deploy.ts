// scripts/deploy.js

import { ethers } from "hardhat";

async function main() {
  const confirmations = 2; // Wait for 2 confirmations

  const erc20TokenAddress = "0x05C5eCEe53692524F72e10588A787aeD324DE367";

  // Step 1: Deploy the BuildingManager contract
  const BuildingManager = await ethers.getContractFactory("BuildingManager");
  console.log("Deploying BuildingManager...");

  const buildingManager = await BuildingManager.deploy();
  const buildingManagerTx = buildingManager.deploymentTransaction();
  if (buildingManagerTx) {
    await buildingManagerTx.wait(confirmations);
  }
  const buildingManagerAddress = await buildingManager.getAddress();
  console.log("BuildingManager deployed to:", buildingManagerAddress);

  // Step 2: Deploy the MapContract
  const MapContract = await ethers.getContractFactory("MapContract");
  console.log("Deploying MapContract...");

  const mapContract = await MapContract.deploy();
  const mapContractTx = mapContract.deploymentTransaction();
  if (mapContractTx) {
    await mapContractTx.wait(confirmations);
  }
  const mapContractAddress = await mapContract.getAddress();
  console.log("MapContract deployed to:", mapContractAddress);

  // Step 3: Deploy the LandNFT contract
  const mintPrice = ethers.parseEther("0.01");
  const LandNFT = await ethers.getContractFactory("LandNFT");
  console.log("Deploying LandNFT...");

  const landNFT = await LandNFT.deploy(mintPrice);
  const landNFTTx = landNFT.deploymentTransaction();
  if (landNFTTx) {
    await landNFTTx.wait(confirmations);
  }
  const landNFTAddress = await landNFT.getAddress();
  console.log("LandNFT deployed to:", landNFTAddress);

  // Step 3.1: Set the ERC20 Token in LandNFT
  console.log("Setting ERC20 Token in LandNFT...");
  const setERC20TokenTx = await landNFT.setERC20Token(erc20TokenAddress);
  await setERC20TokenTx.wait(confirmations);
  console.log("ERC20 Token set in LandNFT to:", erc20TokenAddress);

  // Step 4: Deploy the Leaderboard contract
  const Leaderboard = await ethers.getContractFactory("Leaderboard");
  console.log("Deploying Leaderboard...");

  const leaderboard = await Leaderboard.deploy(landNFTAddress, "0x05C5eCEe53692524F72e10588A787aeD324DE367");
  const leaderboardTx = leaderboard.deploymentTransaction();
  if (leaderboardTx) {
    await leaderboardTx.wait(confirmations);
  }
  const leaderboardAddress = await leaderboard.getAddress();
  console.log("Leaderboard deployed to:", leaderboardAddress);

  // Step 5: Set the BuildingManager in LandNFT
  console.log("Setting BuildingManager in LandNFT...");
  const setBuildingManagerTx = await landNFT.setBuildingManager(buildingManagerAddress);
  await setBuildingManagerTx.wait();
  console.log("BuildingManager set in LandNFT.");

  // Step 6: Set the MapContract in LandNFT
  console.log("Setting MapContract in LandNFT...");
  const setMapContractTx = await landNFT.setMapContract(mapContractAddress);
  await setMapContractTx.wait();
  console.log("MapContract set in LandNFT.");

  // Step 7: Set the LandNFT address in MapContract
  console.log("Setting LandNFT address in MapContract...");
  const setLandNFTAddressTx = await mapContract.setLandNFTAddress(landNFTAddress);
  await setLandNFTAddressTx.wait();
  console.log("LandNFT address set in MapContract.");

  // Step 8: Set the LandNFT address in Leaderboard
  console.log("Setting LandNFT address in Leaderboard...");
  const setLandNFTAddressLeaderboardTx = await leaderboard.updateLandNFT(landNFTAddress);
  await setLandNFTAddressLeaderboardTx.wait();
  console.log("LandNFT address set in Leaderboard.");

  // Step 9: Deploy the MarketContract
  const MarketContract = await ethers.getContractFactory("MarketContract");
  console.log("Deploying MarketContract...");

  const marketContract = await MarketContract.deploy(erc20TokenAddress, landNFTAddress);
  const marketContractTx = marketContract.deploymentTransaction();
  if (marketContractTx) {
    await marketContractTx.wait(confirmations);
  }
  const marketContractAddress = await marketContract.getAddress();
  console.log("MarketContract deployed to:", marketContractAddress);

  // Step 10: Set the MarketContract in LandNFT
  console.log("Setting MarketContract in LandNFT...");
  const setMarketContractTx = await landNFT.setMarketContract(marketContractAddress);
  await setMarketContractTx.wait(confirmations);
  console.log("MarketContract set in LandNFT.");

  // Step 11: Set resource prices to 1 ERC20 token per resource unit
  console.log("Setting initial resource prices to 1 ERC20 token per resource unit...");

  // Get ERC20 token decimals
  const ERC20 = await ethers.getContractAt("ERC20", erc20TokenAddress);
  const decimals = ERC20.decimals ? await ERC20.decimals() : 18; // Default to 18 if undefined

  // Calculate 1 ERC20 token in smallest unit
  const oneToken = ethers.parseUnits("1", decimals);

  // Set resource prices: 1 ERC20 token per resource unit
  const setResourcePricesTx = await marketContract.setResourcePrices(
    oneToken, // foodPrice
    oneToken, // woodPrice
    oneToken, // stonePrice
    oneToken, // brassPrice
    oneToken, // ironPrice
    oneToken  // goldPrice
  );
  await setResourcePricesTx.wait(confirmations);
  console.log("Initial resource prices set to 1 ERC20 token per resource unit.");

  // Final addresses
  console.log("\nContracts deployed and configured:");
  console.log("BuildingManager Address:", buildingManagerAddress);
  console.log("MapContract Address:", mapContractAddress);
  console.log("LandNFT Address:", landNFTAddress);
  console.log("Leaderboard Address:", leaderboardAddress);
  console.log("MarketContract Address:", marketContractAddress);
}

// Run the script and handle errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error in deployment:", error);
    process.exitCode = 1;
  });
