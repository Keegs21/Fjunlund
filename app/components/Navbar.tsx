// components/Navbar.tsx

'use client';

import { Box, Button, Flex, Text, HStack } from '@chakra-ui/react';
import customTheme from 'app/theme/theme';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navbar() {

  return (
    <Box
      as="nav"
      bg={customTheme.colors.primary[700]}
      px={8}
      py={8}
      boxShadow="md"
      position="sticky"
      top={0}
      zIndex={1}
    >
      <Flex alignItems="center" justifyContent="space-between">
      <HStack >
        <Text fontSize="xl" fontWeight="bold" color="white">
          Fjunlund
        </Text>

        {/* Menu Buttons */}
          <Link href="/" passHref>
            <Button
              variant="ghost"
              color="white"
              _hover={{ color: customTheme.colors.secondary[500] }}
            >
              Home
            </Button>
          </Link>
          <Link href="/dashboard" passHref>
            <Button
              variant="ghost"
              color="white"
              _hover={{ color: customTheme.colors.secondary[500] }}
            >
              Dashboard
            </Button>
          </Link>
          <Link href="/map" passHref>
            <Button
              variant="ghost"
              color="white"
              _hover={{ color: customTheme.colors.secondary[500] }}
            >
              Map
            </Button>
          </Link>
          <Link href="/purchase" passHref>
            <Button
              variant="ghost"
              color="white"
              _hover={{ color: customTheme.colors.secondary[500] }}
            >
              Purchase
            </Button>
          </Link>
          <Link href="/development" passHref>
            <Button
              variant="ghost"
              color="white"
              _hover={{ color: customTheme.colors.secondary[500] }}
            >
              Development
            </Button>
          </Link>
        </HStack>

       <ConnectButton
        showBalance={false}
        accountStatus='address'
        chainStatus="icon"
       >
        
       </ConnectButton>
      </Flex>
    </Box>
  );
}
