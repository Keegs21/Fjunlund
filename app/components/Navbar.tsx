'use client';   
import { Box, Button, Flex, Text, Spacer, HStack } from '@chakra-ui/react';
import customTheme from 'app/theme/theme';
import Link from 'next/link';

export default function Navbar() {
  return (
    <Box
      as="nav"
      bg={customTheme.colors.primary[100]}
      px={4}
      py={2}
      boxShadow="md"
      position="sticky"
      top={0}
      zIndex={1}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold" color={customTheme.colors.primary[500]}>
          Fjunlund
        </Text>
        <Spacer />

        {/* Menu Buttons */}
        <HStack spacing={6}>
        <Link href="/" passHref>
          <Button 
            variant="ghost"
            color={customTheme.colors.primary[500]}
            _hover={{ color: customTheme.colors.secondary[500] }}
          >
            Home
          </Button>
        </Link>
          <Link href="/dashboard" passHref>
            <Button 
              variant="ghost"
              color={customTheme.colors.primary[500]}
              _hover={{ color: customTheme.colors.secondary[500] }}
            >
              Dashboard
            </Button>
          </Link>
          <Link href="/development" passHref>
          <Button 
            variant="ghost"
            color={customTheme.colors.primary[500]}
            _hover={{ color: customTheme.colors.secondary[500] }}
          >
            Development
          </Button>
        </Link>
        <Link href="/purchase" passHref>
          <Button 
            variant="ghost"
            color={customTheme.colors.primary[500]}
            _hover={{ color: customTheme.colors.secondary[500] }}
          >
            Purchase
          </Button>
        </Link>
        </HStack>

        {/* Spacer pushes connect wallet button to the right */}
        <Spacer />

        {/* Connect Wallet Button */}
        <Button colorScheme="secondary" size="md">
          Connect Wallet
        </Button>
      </Flex>
    </Box>
  );
}
