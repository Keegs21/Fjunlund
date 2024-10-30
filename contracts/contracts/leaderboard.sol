// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./landNFT.sol";

contract Leaderboard is Ownable {
    IERC20 public erc20Token;
    LandNFT public landNFT;

    struct NFTScore {
        uint256 tokenId;
        uint256 score;
    }

    NFTScore[] public leaderboard;
    mapping(uint256 => uint256) public nftIndex;

    event LeaderboardUpdated();
    event RewardsDistributed();

    constructor(address _landNFTAddress, address _erc20TokenAddress) {
        landNFT = LandNFT(_landNFTAddress);
        erc20Token = IERC20(_erc20TokenAddress);
    }

    function updateLeaderboard() external onlyOwner {
        delete leaderboard;

        uint256 totalSupply = landNFT.totalSupply();
        for (uint256 i = 1; i <= totalSupply; i++) {
            if (landNFT.ownerOf(i) != address(0)) {
                DataTypes.LandStats memory stats = landNFT.getLandStats(i);
                uint256 score = calculateScore(stats);
                leaderboard.push(NFTScore(i, score));
                nftIndex[i] = leaderboard.length - 1;
            }
        }
        
        // Sort leaderboard based on score
        sortLeaderboard();
        
        emit LeaderboardUpdated();
    }

    function calculateScore(DataTypes.LandStats memory stats) internal view returns (uint256) {
        uint256 weightedPopulation = stats.population * 2; // Give more weight to population
        uint256 happiness = stats.happiness;
        uint256 piety = stats.piety;
        uint256 technology = stats.technology;
        uint256 production = stats.production;
        uint256 strength = stats.strength;

        // Introduce randomness for more dynamic scoring
        uint256 randomFactor = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, stats.population))) % 50;

        // Custom scoring calculation with more complexity
        uint256 score = weightedPopulation
            + (happiness * 3 / 2)  // Slightly more weight to happiness
            + (piety * 2)          // Double weight to piety
            + (technology * 5 / 2) // More weight to technology
            + (production * 4 / 3) // Moderate weight to production
            + (strength * 3)       // Triple weight to strength
            + randomFactor;        // Add some randomness to the score

        return score;
    }

    function sortLeaderboard() internal {
        for (uint256 i = 0; i < leaderboard.length; i++) {
            for (uint256 j = i + 1; j < leaderboard.length; j++) {
                if (leaderboard[j].score > leaderboard[i].score) {
                    NFTScore memory temp = leaderboard[i];
                    leaderboard[i] = leaderboard[j];
                    leaderboard[j] = temp;
                }
            }
        }
    }

    function getLeaderboard() external view returns (NFTScore[] memory) {
        return leaderboard;
    }

    // Function to distribute rewards based on leaderboard position
    function distributeRewards(uint256[] calldata rewards) external onlyOwner {
        require(rewards.length == leaderboard.length, "Rewards array length mismatch");

        for (uint256 i = 0; i < leaderboard.length; i++) {
            uint256 rewardAmount = rewards[i];
            uint256 tokenId = leaderboard[i].tokenId;
            address tokenOwner = landNFT.ownerOf(tokenId);
            require(erc20Token.transfer(tokenOwner, rewardAmount), "ERC20 transfer failed");
        }

        emit RewardsDistributed();
    }

    // Function to deposit ERC20 tokens into the contract
    function depositERC20(uint256 amount) external {
        require(erc20Token.transferFrom(msg.sender, address(this), amount), "ERC20 transfer failed");
    }

    // Function to withdraw ERC20 tokens from the contract
    function withdrawERC20(uint256 amount) external onlyOwner {
        require(erc20Token.balanceOf(address(this)) >= amount, "Insufficient balance");
        require(erc20Token.transfer(owner(), amount), "ERC20 transfer failed");
    }

    // Function to update the LandNFT contract address
    function updateLandNFT(address _newLandNFTAddress) external onlyOwner {
        require(_newLandNFTAddress != address(0), "Invalid new address");
        landNFT = LandNFT(_newLandNFTAddress);
    }
}
