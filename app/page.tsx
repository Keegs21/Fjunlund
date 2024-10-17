import { Metadata } from "next"
import Link from "next/link"
import {
  Box,
  Text,
  Heading,
  Button,
  Stack,
  Divider,
  VStack,
  Avatar,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import TranslucentBox from "./components/TranslucentBox"

// Placeholder data for the leaderboard
interface LeaderboardEntry {
  rank: number;
  username: string;
  earnings: number; // Earnings in tokens or currency
  avatarUrl?: string;
}



const leaderboardData: LeaderboardEntry[] = Array.from({ length: 10 }, (_, i) => ({
  rank: i + 1,
  username: `User${i + 1}`,
  earnings: Math.floor(Math.random() * 10000) / 1, // Random earnings between 0 and 100
  avatarUrl: undefined, // You can add avatar URLs if available
}));

export const metadata: Metadata = {
  title: "Fjunlund",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://next-enterprise.vercel.app/",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/.github/assets/project-logo.png",
      },
    ],
  },
}

export default function Web() {
  return (
    <Box p={8} display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
      {/* Welcome Section */}
      <TranslucentBox>
      <Heading as="h1" size="2xl" mb={4} color={'primary.500'}>
        Welcome to Fjunlund
      </Heading>
      <Text fontSize="xl" fontStyle="italic" mb={6}>
        Where DeFi Investment Meets Immersive NFT Gaming
      </Text>
      </TranslucentBox>

      <Divider my={6} />

      {/* Embark on a New Adventure */}
      <TranslucentBox>
      <Heading as="h2" size="lg" mb={4} color={'primary.500'}>
        Embark on a New Adventure
      </Heading>
      <Text mb={4}>
        Fjunlund is a revolutionary blockchain game that seamlessly integrates
        decentralized finance (DeFi) with the exciting world of non-fungible
        tokens (NFTs). We offer a unique platform where your investment
        performance in DeFi doesn't just grow your portfolio—it rewards you in our game.
      </Text>
      </TranslucentBox>

      <Divider my={6} />

      {/* Why Fjunlund */}
      <TranslucentBox>
      <Heading as="h2" size="lg" mb={4} color={'primary.500'}>
        Turn your investment performance into usable assets
      </Heading>
      <VStack align="center" spacing={3} mb={4}>
        <Text color="secondary.500">
          • <strong>Invest and Earn:</strong> Participate in DeFi investments
          directly through our platform.
        </Text>
        <Text>
          • <strong>Performance-Based Rewards:</strong> Receive our game tokens
          based on how well your investments perform.
        </Text>
        <Text color="secondary.500">
          • <strong>Own Virtual Land:</strong> Use your tokens to develop and
          customize land parcels represented by unique NFTs.
        </Text>
        <Text>
          • <strong>Thriving Community:</strong> Join a vibrant ecosystem of
          investors and gamers collaborating in a dynamic world.
        </Text>
      </VStack>
      </TranslucentBox>

      <Divider my={6} />

      {/* How It Works */}
      <TranslucentBox>
      <Heading as="h2" size="lg" mb={4} color={'primary.500'}>
        Play our new Epoch based strategy game with our Gaming NFT
      </Heading>
      <VStack align="center" spacing={3} mb={4}>
        <Text color="secondary.500">
          <strong>1. Start Investing:</strong> Connect your wallet, purchase an NFT and begin
          investing in a variety of DeFi opportunities through our custom vaults to earn currency for your NFT.
        </Text>
        <Text>
          <strong>2. Your NFT Represents your Land:</strong> Your NFT represents your land in Fjunlund.
          The happier your land, the more currency you earn. Upgrade your land and build your empire, as your land grows so does the value of your NFT.
        </Text>
        <Text color="secondary.500">
          <strong>3. Raise an Empire:</strong> Upgrade your NFT, and develop your land and armies until you are the most powerful player in Fjunlund.
          Weekly leaderboards will show the top players and investors.
        </Text>
        <Text>
          <strong>4. Interact, Trade, and Battle:</strong> Engage with other players,
          trade your NFTs, resources, and currency, and build alliances. Assemble the strongest army and defeat users in the War Square to prove it.
        </Text>
      </VStack>
      </TranslucentBox>

      <Divider my={6} />

      {/* Features */}
      <TranslucentBox>
      <Heading as="h2" size="lg" mb={4} color={'primary.500'}>
        Features
      </Heading>
      <VStack align="center" spacing={3} mb={4}>
        <Text color="secondary.500">
          • <strong>User-Friendly Interface:</strong> Navigate DeFi investments
          and gaming features with ease.
        </Text>
        <Text>
          • <strong>Secure and Transparent:</strong> Built on robust blockchain
          technology ensuring security and transparency.
        </Text>
        <Text color="secondary.500">
          • <strong>Constant Evolution:</strong> Regular updates and new features
          keep the game fresh and exciting.
        </Text>
      </VStack>
      </TranslucentBox>

      <Divider my={6} />

      <TranslucentBox>
      <Heading as="h2" size="lg" mb={4} color="primary.500">
        Top 10 Earners of the Previous Epoch
      </Heading>
      <TableContainer>
        <Table variant="striped" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>User</Th>
              <Th isNumeric>Earnings</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaderboardData.map((entry) => (
              <Tr key={entry.rank} color={'secondary.500'}>
                <Td>{entry.rank}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Avatar
                      size="sm"
                      name={entry.username}
                      src={entry.avatarUrl}
                    />
                    <Text>{entry.username}</Text>
                  </HStack>
                </Td>
                <Td isNumeric>{entry.earnings.toLocaleString()} Tokens</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      </TranslucentBox>
    </Box>

    
  )
}
