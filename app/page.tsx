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
} from "@chakra-ui/react"

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
    <Box p={8}>
      {/* Welcome Section */}
      <Heading as="h1" size="2xl" mb={4}>
        Welcome to Fjunlund
      </Heading>
      <Text fontSize="xl" fontStyle="italic" mb={6}>
        Where DeFi Investment Meets Immersive NFT Gaming
      </Text>

      <Divider my={6} />

      {/* Embark on a New Adventure */}
      <Heading as="h2" size="lg" mb={4}>
        Embark on a New Adventure
      </Heading>
      <Text mb={4}>
        Fjunlund is a revolutionary blockchain game that seamlessly integrates
        decentralized finance (DeFi) with the exciting world of non-fungible
        tokens (NFTs). We offer a unique platform where your investment
        performance in DeFi doesn't just grow your portfolio—it enhances your
        gaming experience.
      </Text>

      <Divider my={6} />

      {/* Why Fjunlund */}
      <Heading as="h2" size="lg" mb={4}>
        Why Fjunlund?
      </Heading>
      <VStack align="start" spacing={3} mb={4}>
        <Text>
          • <strong>Invest and Earn:</strong> Participate in DeFi investments
          directly through our platform.
        </Text>
        <Text>
          • <strong>Performance-Based Rewards:</strong> Receive in-game tokens
          based on how well your investments perform.
        </Text>
        <Text>
          • <strong>Own Virtual Land:</strong> Use your tokens to develop and
          customize land parcels represented by unique NFTs.
        </Text>
        <Text>
          • <strong>Thriving Community:</strong> Join a vibrant ecosystem of
          investors and gamers collaborating in a dynamic world.
        </Text>
      </VStack>

      <Divider my={6} />

      {/* How It Works */}
      <Heading as="h2" size="lg" mb={4}>
        How It Works
      </Heading>
      <VStack align="start" spacing={3} mb={4}>
        <Text>
          <strong>1. Start Investing:</strong> Connect your wallet, purchase an NFT and begin
          investing in a variety of DeFi opportunities.
        </Text>
        <Text>
          <strong>2. Earn Tokens:</strong> Your investment success translates
          into earning Fjunlund tokens.
        </Text>
        <Text>
          <strong>3. Develop Your Land:</strong> Use tokens to acquire, develop,
          and personalize your NFT land parcels.
        </Text>
        <Text>
          <strong>4. Interact and Trade:</strong> Engage with other players,
          trade assets, and expand your influence within Fjunlund.
        </Text>
      </VStack>

      <Divider my={6} />

      {/* Features */}
      <Heading as="h2" size="lg" mb={4}>
        Features
      </Heading>
      <VStack align="start" spacing={3} mb={4}>
        <Text>
          • <strong>User-Friendly Interface:</strong> Navigate DeFi investments
          and gaming features with ease.
        </Text>
        <Text>
          • <strong>Secure and Transparent:</strong> Built on robust blockchain
          technology ensuring security and transparency.
        </Text>
        <Text>
          • <strong>Constant Evolution:</strong> Regular updates and new features
          keep the game fresh and exciting.
        </Text>
      </VStack>

      <Divider my={6} />

      {/* Get Started */}
      <Heading as="h2" size="lg" mb={4}>
        Get Started Today
      </Heading>
      <Text mb={4}>
        Step into the future of interactive investment and gaming. Click below
        to begin your journey in Fjunlund.
      </Text>
      <Link href="/purchase" passHref>
      <Button colorScheme="teal" size="lg">
        Start Your Adventure
      </Button>
      </Link>
    </Box>
  )
}
