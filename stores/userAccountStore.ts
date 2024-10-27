// stores/useUserStore.ts
import { create } from "zustand";
import { ethers } from "ethers";

interface UserState {
  account: string | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  provider: ethers.Provider | null;
}

export const useUserStore = create<UserState>((set) => ({
  account: null,
  isConnected: false,
  provider: null,

  connectWallet: async () => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        // Request account access
        const [selectedAccount] = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });

        const provider = new ethers.BrowserProvider(
          (window as any).ethereum
        );

        set({
          account: selectedAccount,
          isConnected: true,
          provider,
        });
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  },

  disconnectWallet: () => {
    set({
      account: null,
      isConnected: false,
      provider: null,
    });
  },
}));
