// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title RewardsDistributor
 * @dev This contract reads the current leaderboard from the Leaderboard contract and distributes ERC20 rewards
 * based on the players' positions. Higher-ranked players receive higher rewards following a weighted distribution.
 */

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @dev Interface for the Leaderboard contract.
 */
interface ILeaderboard {
    struct NFTScore {
        uint256 tokenId;
        uint256 score;
    }

    function getLeaderboard() external view returns (NFTScore[] memory);
}

/**
 * @dev Interface for the LandNFT contract.
 */
interface ILandNFT {
    function ownerOf(uint256 tokenId) external view returns (address);
}

contract RewardsDistributor is Ownable, ReentrancyGuard {
    // ===============================
    // ========== EVENTS ============
    // ===============================

    /**
     * @dev Emitted when rewards are successfully distributed.
     * @param totalRewards Total rewards distributed in this transaction.
     */
    event RewardsDistributed(uint256 totalRewards);

    /**
     * @dev Emitted when reward distribution parameters are updated.
     * @param weights New reward weights for distribution.
     */
    event RewardWeightsUpdated(uint256[] weights);

    /**
     * @dev Emitted when ERC20 tokens are deposited into the contract.
     * @param from Address from which tokens were deposited.
     * @param amount Amount of tokens deposited.
     */
    event ERC20Deposited(address indexed from, uint256 amount);

    /**
     * @dev Emitted when ERC20 tokens are withdrawn from the contract.
     * @param to Address to which tokens were withdrawn.
     * @param amount Amount of tokens withdrawn.
     */
    event ERC20Withdrawn(address indexed to, uint256 amount);

    // ===============================
    // ======== STATE VARIABLES =====
    // ===============================

    IERC20 public immutable erc20Token;
    ILeaderboard public leaderboardContract;
    ILandNFT public landNFTContract;

    // Reward weights corresponding to leaderboard positions.
    // For example, weights[0] is for rank 1, weights[1] for rank 2, etc.
    uint256[] public rewardWeights;

    // Total weight sum to ensure proper distribution.
    uint256 public totalWeight;

    // Maximum number of leaderboard positions to distribute rewards to.
    uint256 public maxRewardsRecipients;

    // ===============================
    // ========= CONSTRUCTOR =========
    // ===============================

    /**
     * @dev Initializes the contract with the addresses of the Leaderboard, LandNFT, and ERC20 token contracts.
     * @param _leaderboardAddress Address of the Leaderboard contract.
     * @param _landNFTAddress Address of the LandNFT contract.
     * @param _erc20TokenAddress Address of the ERC20 token used for rewards.
     * @param _rewardWeights Initial reward weights for distribution.
     * @param _maxRewardsRecipients Maximum number of leaderboard positions to distribute rewards to.
     */
    constructor(
        address _leaderboardAddress,
        address _landNFTAddress,
        address _erc20TokenAddress,
        uint256[] memory _rewardWeights,
        uint256 _maxRewardsRecipients
    ) {
        require(_leaderboardAddress != address(0), "Invalid Leaderboard address");
        require(_landNFTAddress != address(0), "Invalid LandNFT address");
        require(_erc20TokenAddress != address(0), "Invalid ERC20 token address");
        require(_rewardWeights.length > 0, "Reward weights required");
        require(_maxRewardsRecipients > 0, "Invalid max rewards recipients");

        leaderboardContract = ILeaderboard(_leaderboardAddress);
        landNFTContract = ILandNFT(_landNFTAddress);
        erc20Token = IERC20(_erc20TokenAddress);

        setRewardWeights(_rewardWeights);
        setMaxRewardsRecipients(_maxRewardsRecipients);
    }

    // ===============================
    // ========== MODIFIERS ==========
    // ===============================

    /**
     * @dev Ensures that the leaderboard has been updated before distribution.
     */
    modifier leaderboardUpdated() {
        // Implement any necessary checks to ensure the leaderboard is up-to-date.
        _;
    }

    // ===============================
    // ========== FUNCTIONS ==========
    // ===============================

    /**
     * @dev Sets or updates the reward weights. Only the contract owner can call this.
     * @param _rewardWeights Array of weights corresponding to leaderboard positions.
     * The length should ideally match or exceed `maxRewardsRecipients`.
     */
    function setRewardWeights(uint256[] memory _rewardWeights) public onlyOwner {
        require(_rewardWeights.length > 0, "Reward weights required");
        require(_rewardWeights.length >= maxRewardsRecipients, "Insufficient reward weights for recipients");

        // Reset previous weights and totalWeight
        delete rewardWeights;
        totalWeight = 0;

        for (uint256 i = 0; i < _rewardWeights.length; i++) {
            require(_rewardWeights[i] > 0, "Reward weight must be positive");
            rewardWeights.push(_rewardWeights[i]);
            totalWeight += _rewardWeights[i];
        }

        emit RewardWeightsUpdated(_rewardWeights);
    }

    /**
     * @dev Sets or updates the maximum number of leaderboard positions to distribute rewards to.
     * Only the contract owner can call this.
     * @param _maxRecipients Maximum number of recipients.
     */
    function setMaxRewardsRecipients(uint256 _maxRecipients) public onlyOwner {
        require(_maxRecipients > 0, "Must have at least one recipient");
        require(rewardWeights.length >= _maxRecipients, "Set reward weights first");

        maxRewardsRecipients = _maxRecipients;
    }

    /**
     * @dev Deposits ERC20 tokens into the contract. The sender must approve the contract beforehand.
     * @param amount Amount of tokens to deposit.
     */
    function depositERC20(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than zero");
        require(erc20Token.transferFrom(msg.sender, address(this), amount), "ERC20 transfer failed");

        emit ERC20Deposited(msg.sender, amount);
    }

    /**
     * @dev Withdraws ERC20 tokens from the contract. Only the contract owner can call this.
     * @param amount Amount of tokens to withdraw.
     */
    function withdrawERC20(uint256 amount) external onlyOwner nonReentrant {
        require(amount > 0, "Amount must be greater than zero");
        require(erc20Token.balanceOf(address(this)) >= amount, "Insufficient token balance");
        require(erc20Token.transfer(msg.sender, amount), "ERC20 transfer failed");

        emit ERC20Withdrawn(msg.sender, amount);
    }

    /**
     * @dev Updates the Leaderboard contract address. Only the contract owner can call this.
     * @param _newLeaderboardAddress New address of the Leaderboard contract.
     */
    function updateLeaderboardContract(address _newLeaderboardAddress) external onlyOwner {
        require(_newLeaderboardAddress != address(0), "Invalid Leaderboard address");
        leaderboardContract = ILeaderboard(_newLeaderboardAddress);
    }

    /**
     * @dev Updates the LandNFT contract address. Only the contract owner can call this.
     * @param _newLandNFTAddress New address of the LandNFT contract.
     */
    function updateLandNFTContract(address _newLandNFTAddress) external onlyOwner {
        require(_newLandNFTAddress != address(0), "Invalid LandNFT address");
        landNFTContract = ILandNFT(_newLandNFTAddress);
    }

    /**
     * @dev Distributes rewards to all recipients on the leaderboard based on their positions.
     * Higher-ranked players receive more rewards according to the predefined weights.
     * Only the contract owner can call this.
     */
    function distributeRewards() external onlyOwner nonReentrant leaderboardUpdated {
        ILeaderboard.NFTScore[] memory currentLeaderboard = leaderboardContract.getLeaderboard();
        require(currentLeaderboard.length > 0, "Leaderboard is empty");

        uint256 recipients = currentLeaderboard.length;
        if (recipients > maxRewardsRecipients) {
            recipients = maxRewardsRecipients;
        }

        uint256 totalRewardsDistributed = 0;

        for (uint256 i = 0; i < recipients; i++) {
            uint256 tokenId = currentLeaderboard[i].tokenId;
            address tokenOwner = landNFTContract.ownerOf(tokenId);
            require(tokenOwner != address(0), "Invalid token owner");

            uint256 rewardAmount = (rewardWeights[i] * erc20Token.balanceOf(address(this))) / totalWeight;
            require(rewardAmount > 0, "Reward amount must be greater than zero");

            require(erc20Token.transfer(tokenOwner, rewardAmount), "ERC20 transfer failed");

            totalRewardsDistributed += rewardAmount;
        }

        emit RewardsDistributed(totalRewardsDistributed);
    }

    /**
     * @dev Retrieves the current reward weights.
     * @return Array of reward weights.
     */
    function getRewardWeights() external view returns (uint256[] memory) {
        return rewardWeights;
    }

    /**
     * @dev Retrieves the current leaderboard.
     * @return Array of NFTScore structs representing the leaderboard.
     */
    function getCurrentLeaderboard() external view returns (ILeaderboard.NFTScore[] memory) {
        return leaderboardContract.getLeaderboard();
    }

    /**
     * @dev Calculates the total rewards available in the contract.
     * @return Total ERC20 token balance in the contract.
     */
    function getTotalRewardsAvailable() external view returns (uint256) {
        return erc20Token.balanceOf(address(this));
    }
}
