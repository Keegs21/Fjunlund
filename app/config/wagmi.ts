import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem';


export const fantomSonicTestnet = /*#__PURE__*/ defineChain({
    id: 64165,
    name: 'Sonic Testnet',
    network: 'fantom-sonic-testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Sonic',
      symbol: 'S',
    },
    rpcUrls: {
      default: { http: ['https://rpc.testnet.soniclabs.com/'] },
    },
    blockExplorers: {
      default: {
        name: 'Fantom Sonic Open Testnet Explorer',
        url: 'https://public-sonic.fantom.network',
      },
    },
    testnet: true,
  })

export const config = getDefaultConfig({
  appName: 'Fjunlund',
  projectId: '8238d3335e9746ff4cfef0ba18d216c3',
  chains: [
    fantomSonicTestnet,
  ],
  ssr: true,
});
