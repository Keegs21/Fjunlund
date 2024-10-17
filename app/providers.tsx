// app/providers.tsx
'use client';

import { ChakraProvider } from '@chakra-ui/react';
import customTheme from './theme/theme'; // Import your custom theme
import { WagmiProvider } from 'wagmi'; // Updated to WagmiConfig
import { config } from './config/wagmi'; // Wagmi configuration
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // React Query for data fetching
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'; // RainbowKit for wallet integration
import '@rainbow-me/rainbowkit/styles.css';


// Create a QueryClient instance for React Query
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={customTheme}>
          <RainbowKitProvider>
            {children}
          </RainbowKitProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
