// frontend/src/chains.ts

import { Chain } from 'thirdweb/chains';
import { defineChain } from 'thirdweb/chains';

export const fantomSonicTestnet: Chain = defineChain({
  id: 64165,
  rpc: "https://rpc.testnet.soniclabs.com/",
  name: 'Sonic Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Sonic',
    symbol: 'S',
  },
  blockExplorers: [
    {
      name: 'Fantom Sonic Open Testnet Explorer',
      url: 'https://public-sonic.fantom.network',
    },
  ],
  testnet: true,
});
