// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// OpenZeppelin Contracts
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Custom Contracts
import "./DataTypes.sol";

// Interface for LandNFT to interact with addResources function
interface ILandNFT {
    function addResources(uint256 tokenId, DataTypes.Resources memory resources) external;
}

contract MarketContract is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // ERC20 token used for payments
    IERC20 public immutable erc20Token;

    // LandNFT contract address
    ILandNFT public immutable landNFT;

    // Pricing for each resource (price per unit)
    struct ResourcePrice {
        uint256 foodPrice;
        uint256 woodPrice;
        uint256 stonePrice;
        uint256 brassPrice;
        uint256 ironPrice;
        uint256 goldPrice;
    }

    ResourcePrice public resourcePrice;

    // Events
    event ResourcesPurchased(address indexed buyer, uint256 indexed tokenId, DataTypes.Resources resources, uint256 totalCost);
    event ResourcePricesUpdated(ResourcePrice newPrices);
    event ERC20Withdrawn(address indexed owner, uint256 amount);

    /**
     * @dev Constructor initializes the MarketContract with ERC20 and LandNFT addresses.
     * @param _erc20Token The address of the ERC20 token used for payments.
     * @param _landNFT The address of the LandNFT contract.
     */
    constructor(address _erc20Token, address _landNFT) {
        require(_erc20Token != address(0), "Invalid ERC20 token address");
        require(_landNFT != address(0), "Invalid LandNFT address");
        erc20Token = IERC20(_erc20Token);
        landNFT = ILandNFT(_landNFT);
    }

    /**
     * @dev Allows the owner to set the prices for each resource.
     *      Initial prices should be set to 1 ERC20 token per resource unit.
     * @param _foodPrice Price per unit of food.
     * @param _woodPrice Price per unit of wood.
     * @param _stonePrice Price per unit of stone.
     * @param _brassPrice Price per unit of brass.
     * @param _ironPrice Price per unit of iron.
     * @param _goldPrice Price per unit of gold.
     */
    function setResourcePrices(
        uint256 _foodPrice,
        uint256 _woodPrice,
        uint256 _stonePrice,
        uint256 _brassPrice,
        uint256 _ironPrice,
        uint256 _goldPrice
    ) external onlyOwner {
        resourcePrice = ResourcePrice({
            foodPrice: _foodPrice,
            woodPrice: _woodPrice,
            stonePrice: _stonePrice,
            brassPrice: _brassPrice,
            ironPrice: _ironPrice,
            goldPrice: _goldPrice
        });

        emit ResourcePricesUpdated(resourcePrice);
    }

    /**
     * @dev Allows users to purchase resources for a specific LandNFT token.
     * @param tokenId The tokenId of the LandNFT to receive resources.
     * @param desiredResources The amount of each resource the user wants to purchase.
     */
    function buyResources(uint256 tokenId, DataTypes.Resources memory desiredResources) external nonReentrant {
        require(desiredResources.food > 0 || desiredResources.wood > 0 || desiredResources.stone > 0 ||
                desiredResources.brass > 0 || desiredResources.iron > 0 || desiredResources.gold > 0,
                "No resources specified for purchase");

        // Calculate total cost
        uint256 totalCost = (desiredResources.food * resourcePrice.foodPrice) +
                            (desiredResources.wood * resourcePrice.woodPrice) +
                            (desiredResources.stone * resourcePrice.stonePrice) +
                            (desiredResources.brass * resourcePrice.brassPrice) +
                            (desiredResources.iron * resourcePrice.ironPrice) +
                            (desiredResources.gold * resourcePrice.goldPrice);

        require(totalCost > 0, "Total cost must be greater than zero");

        // Transfer ERC20 tokens from buyer to this contract
        erc20Token.safeTransferFrom(msg.sender, address(this), totalCost);

        // Add resources to the specified LandNFT
        landNFT.addResources(tokenId, desiredResources);

        emit ResourcesPurchased(msg.sender, tokenId, desiredResources, totalCost);
    }

    /**
     * @dev Allows the owner to withdraw collected ERC20 tokens from the contract.
     * @param amount The amount of ERC20 tokens to withdraw.
     */
    function withdrawERC20(uint256 amount) external onlyOwner {
        require(amount > 0, "Withdrawal amount must be greater than zero");
        require(erc20Token.balanceOf(address(this)) >= amount, "Insufficient ERC20 balance");

        erc20Token.safeTransfer(owner(), amount);

        emit ERC20Withdrawn(owner(), amount);
    }

    /**
     * @dev Allows the owner to withdraw all collected ERC20 tokens from the contract.
     */
    function withdrawAllERC20() external onlyOwner {
        uint256 balance = erc20Token.balanceOf(address(this));
        require(balance > 0, "No ERC20 tokens to withdraw");

        erc20Token.safeTransfer(owner(), balance);

        emit ERC20Withdrawn(owner(), balance);
    }

    /**
     * @dev Retrieves the current prices for all resources.
     * @return The current resource prices.
     */
    function getResourcePrices() external view returns (ResourcePrice memory) {
        return resourcePrice;
    }
}
