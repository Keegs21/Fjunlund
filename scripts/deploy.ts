import { ethers } from "hardhat";

async function main() {
  // Step 1: Deploy the BuildingManager contract
  const BuildingManager = await ethers.getContractFactory("BuildingManager");
  console.log("Deploying BuildingManager...");

  const buildingManager = await BuildingManager.deploy();

  // Wait for the deployment to be mined
  const deploymentTx = buildingManager.deploymentTransaction();
  if (deploymentTx) {
    await deploymentTx.wait();
  } else {
    throw new Error("Deployment transaction is null");
  }

  const buildingManagerAddress = await buildingManager.getAddress();
  console.log("BuildingManager deployed to:", buildingManagerAddress);

  // Step 2: Deploy the MapContract
  const MapContract = await ethers.getContractFactory("MapContract");
  console.log("Deploying MapContract...");

  const mapContract = await MapContract.deploy();

  // Wait for the deployment to be mined
  const mapContractDeploymentTx = mapContract.deploymentTransaction();
  if (mapContractDeploymentTx) {
    await mapContractDeploymentTx.wait();
  } else {
    throw new Error("MapContract deployment transaction is null");
  }

  const mapContractAddress = await mapContract.getAddress();
  console.log("MapContract deployed to:", mapContractAddress);

  // Step 3: Deploy the LandNFT contract
  // Note: Adjust the mint price as needed
  const mintPrice = ethers.parseEther("0.1"); // Example mint price: 0.1 ETH
  const LandNFT = await ethers.getContractFactory("LandNFT");
  console.log("Deploying LandNFT...");

  const landNFT = await LandNFT.deploy(mintPrice);

  // Wait for the deployment to be mined
  const landNFTDeploymentTx = landNFT.deploymentTransaction();
  if (landNFTDeploymentTx) {
    await landNFTDeploymentTx.wait();
  } else {
    throw new Error("LandNFT deployment transaction is null");
  }

  const landNFTAddress = await landNFT.getAddress();
  console.log("LandNFT deployed to:", landNFTAddress);

  // Step 4: Set the BuildingManager in LandNFT
  console.log("Setting BuildingManager in LandNFT...");
  const setBuildingManagerTx = await landNFT.setBuildingManager(buildingManagerAddress);
  await setBuildingManagerTx.wait();
  console.log("BuildingManager set in LandNFT.");

  // Step 5: Set the MapContract in LandNFT
  console.log("Setting MapContract in LandNFT...");
  const setMapContractTx = await landNFT.setMapContract(mapContractAddress);
  await setMapContractTx.wait();
  console.log("MapContract set in LandNFT.");

  // Step 6: Set the LandNFT address in MapContract
  console.log("Setting LandNFT address in MapContract...");
  const setLandNFTAddressTx = await mapContract.setLandNFTAddress(landNFTAddress);
  await setLandNFTAddressTx.wait();
  console.log("LandNFT address set in MapContract.");

  // Final addresses
  console.log("Contracts deployed and configured:");
  console.log("BuildingManager Address:", buildingManagerAddress);
  console.log("MapContract Address:", mapContractAddress);
  console.log("LandNFT Address:", landNFTAddress);
}

// Run the script and handle errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error in deployment:", error);
    process.exitCode = 1;
  });
