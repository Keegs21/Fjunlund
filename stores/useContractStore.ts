// stores/useContractStore.ts
import { create } from "zustand";
import { ethers } from "ethers";
import BuildingManagerABI from "@/abis/BuildingManager.json"; // Adjust the path as needed
import { useUserStore } from "./userAccountStore";

interface ContractState {
  buildingManager: ethers.Contract | null;
  initializeContracts: () => void;
  getBuildingsForToken: (tokenId: string) => Promise<string[]>;
  // Add more contract-related functions as needed
}

export const useContractStore = create<ContractState>((set, get) => ({
  buildingManager: null,

  initializeContracts: () => {
    const { provider } = useUserStore.getState();
    if (!provider) {
      console.error("Provider not available. Connect wallet first.");
      return;
    }

    const signer = provider.getSigner();
    const buildingManagerAddress = "0xYourBuildingManagerContractAddress"; // Replace with your contract's address

    const buildingManager = new ethers.Contract(
      buildingManagerAddress,
      BuildingManagerABI,
      signer
    );

    set({ buildingManager });
  },

  getBuildingsForToken: async (tokenId: string): Promise<string[]> => {
    const { buildingManager } = get();
    if (!buildingManager) {
      console.error("BuildingManager contract not initialized.");
      return [];
    }

    try {
      // Assuming your contract has a function `getBuildingsForToken` that returns an array of BuildingInfo
      const buildings = await buildingManager.getBuildingsForToken(
        tokenId
      );

      // Extract building names from the BuildingInfo structs
      const buildingNames = buildings.map((building: any) => building.name);
      return buildingNames;
    } catch (error) {
      console.error("Error fetching buildings:", error);
      return [];
    }
  },

  // Add more contract-related actions here
}));
