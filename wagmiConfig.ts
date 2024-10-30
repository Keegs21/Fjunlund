import { defineChain, createClient } from 'viem';
import { createConfig, http  } from '@wagmi/core'

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

export const config = createConfig({
    chains: [fantomSonicTestnet],
    client({ chain }) {
        return createClient({ chain, transport: http() })
      },
  })