// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// OpenZeppelin Contracts
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol"; // For safe ERC20 operations
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Custom Contracts
import "./BuildingManager.sol";
import "./DataTypes.sol";
import "./mapContract.sol";

contract LandNFT is ERC721Enumerable, Ownable, ReentrancyGuard {
    using SafeERC20 for ERC20;
    using DataTypes for DataTypes.Resources;
    using DataTypes for DataTypes.ResourceProduction;
    using DataTypes for DataTypes.LandStats;
    using DataTypes for DataTypes.Building;
    using DataTypes for DataTypes.BuildingUnderConstruction;
    using DataTypes for DataTypes.BuildingInfo;

    // ERC20 token used for payments
    ERC20 public erc20Token;

    // External contract references
    BuildingManager public buildingManager;
    MapContract public mapContract;

    // MarketContract address
    address public marketContract;

    // Token and minting parameters
    uint256 public nextTokenId;
    uint256 public mintPrice;
    uint256 public epochDuration = 1 hours;
    uint256 public maxSupply = 10000; // Initial maximum supply

    // Epoch tracking
    uint256 public lastEpochUpdateTime;
    uint256 public lastFlippedEpochTime;

    // ERC20 token decimals
    uint8 public tokenDecimals;

    // Mapping from tokenId to land statistics
    mapping(uint256 => DataTypes.LandStats) public landStats;

    // Events
    event Minted(address indexed owner, uint256 tokenId, int256 x, int256 y);
    event BuildingConstructionStarted(
        uint256 tokenId,
        string buildingName,
        uint256 level,
        uint256 completionTime,
        uint256 erc20Cost
    );
    event BuildingConstructionCompleted(uint256 tokenId, string buildingName, uint256 level);
    event EpochUpdated(uint256 epochNumber);
    event MarketContractSet(address indexed marketContract);

    // Enum for minting options
    enum MintOption { RANDOM, ADJACENT }

    /**
     * @dev Constructor initializes the ERC721 token with a name and symbol.
     * @param _mintPrice The initial price to mint a LandNFT.
     */
    constructor(uint256 _mintPrice) ERC721("Fjunlund Land", "FJL") {
        mintPrice = _mintPrice;
        nextTokenId = 1;
        lastEpochUpdateTime = block.timestamp;
    }

    /**
     * @dev Sets the ERC20 token address. Can only be called once by the owner.
     * @param _erc20Token The address of the ERC20 token contract.
     */
    function setERC20Token(address _erc20Token) external onlyOwner {
        require(address(erc20Token) == address(0), "ERC20 token address already set");
        erc20Token = ERC20(_erc20Token);
        tokenDecimals = erc20Token.decimals();
    }

    /**
     * @dev Sets the BuildingManager contract address. Can only be called once by the owner.
     * @param _buildingManager The address of the BuildingManager contract.
     */
    function setBuildingManager(address _buildingManager) external onlyOwner {
        require(address(buildingManager) == address(0), "BuildingManager already set");
        buildingManager = BuildingManager(_buildingManager);
    }

    /**
     * @dev Sets the MapContract address. Can only be called once by the owner.
     * @param _mapContract The address of the MapContract.
     */
    function setMapContract(address _mapContract) external onlyOwner {
        require(address(mapContract) == address(0), "MapContract already set");
        mapContract = MapContract(_mapContract);
    }

    /**
     * @dev Sets the MarketContract address. Can only be called once by the owner.
     * @param _marketContract The address of the MarketContract.
     */
    function setMarketContract(address _marketContract) external onlyOwner {
        require(_marketContract != address(0), "Invalid MarketContract address");
        require(marketContract == address(0), "MarketContract already set");
        marketContract = _marketContract;
        emit MarketContractSet(_marketContract);
    }

    /**
     * @dev Modifier to restrict functions to only the MarketContract.
     */
    modifier onlyMarketContract() {
        require(msg.sender == marketContract, "Caller is not the MarketContract");
        _;
    }

    /**
     * @dev Function to add resources to a user's land. Can only be called by the MarketContract.
     * @param tokenId The tokenId of the LandNFT.
     * @param resources The resources to add.
     */
    function addResources(uint256 tokenId, DataTypes.Resources memory resources) external onlyMarketContract {
        require(_exists(tokenId), "Token does not exist");
        landStats[tokenId].resources.food += resources.food;
        landStats[tokenId].resources.wood += resources.wood;
        landStats[tokenId].resources.stone += resources.stone;
        landStats[tokenId].resources.brass += resources.brass;
        landStats[tokenId].resources.iron += resources.iron;
        landStats[tokenId].resources.gold += resources.gold;

        // Optionally emit an event for resource addition
        // emit ResourcesAdded(tokenId, resources);
    }

    /**
     * @dev Mints a new LandNFT. Requires payment in ETH.
     * @param option The minting option (RANDOM or ADJACENT).
     * @param existingTokenId The tokenId to attach adjacency if option is ADJACENT.
     */
    function mint(MintOption option, uint256 existingTokenId) external payable nonReentrant {
        require(msg.value >= mintPrice, "Insufficient payment");
        require(address(mapContract) != address(0), "MapContract not set");
        require(nextTokenId <= maxSupply, "Maximum supply reached");

        uint256 tokenId = nextTokenId;
        nextTokenId += 1;

        _safeMint(msg.sender, tokenId);

        // Initialize land stats with default values
        DataTypes.LandStats storage stats = landStats[tokenId];

        stats.population = 100;
        stats.production = 50;
        stats.happiness = 50;
        stats.technology = 10;
        stats.piety = 10;
        stats.strength = 10;
        stats.resources = DataTypes.Resources({
            food: 500,
            wood: 300,
            stone: 200,
            brass: 100,
            iron: 100,
            gold: 250
        });
        stats.lastResourceUpdate = block.timestamp;

        // Assign coordinates via MapContract
        if (option == MintOption.ADJACENT) {
            require(ownerOf(existingTokenId) == msg.sender, "Not the owner of the existing land");
            (int256 existingX, int256 existingY) = mapContract.getTokenCoordinates(existingTokenId);
            DataTypes.Coordinates[] memory availableCoords = mapContract.getAvailableAdjacentCoordinates(existingX, existingY);
            require(availableCoords.length > 0, "No adjacent coordinates available");

            // Select the first available adjacent coordinate
            DataTypes.Coordinates memory selectedCoord = availableCoords[0];
            mapContract.assignCoordinate(tokenId, selectedCoord.x, selectedCoord.y);
            emit Minted(msg.sender, tokenId, selectedCoord.x, selectedCoord.y);
        } else if (option == MintOption.RANDOM) {
            (int256 randX, int256 randY) = mapContract.assignRandomCoordinate(tokenId);
            emit Minted(msg.sender, tokenId, randX, randY);
        }

        // Add a pre-built Farm building (level 1) to the land
        DataTypes.Building memory farmBuilding = DataTypes.Building({
            name: "Farm",
            level: 1,
            isActive: true
        });
        stats.buildings.push(farmBuilding);

        // Add a pre-built Marketplace building (level 1) to the land
        DataTypes.Building memory marketplaceBuilding = DataTypes.Building({
            name: "Marketplace",
            level: 1,
            isActive: true
        });
        stats.buildings.push(marketplaceBuilding);

        // Apply the boosts from the Farm building
        BuildingManager.BuildingInfo memory farmInfo = buildingManager.getBuildingInfo("Farm", 1);
        stats.production += farmInfo.productionBoost;
        stats.happiness += farmInfo.happinessBoost;
        stats.strength += farmInfo.strengthBoost;

        BuildingManager.BuildingInfo memory marketplaceInfo = buildingManager.getBuildingInfo("Marketplace", 1);
        stats.piety += marketplaceInfo.pietyBoost;
        stats.happiness += marketplaceInfo.happinessBoost;
    }

    /**
     * @dev Increases the maximum supply of LandNFTs. Only callable by the owner.
     * @param newMaxSupply The new maximum supply.
     */
    function increaseMaxSupply(uint256 newMaxSupply) external onlyOwner {
        require(newMaxSupply > maxSupply, "New max supply must be greater than current max supply");
        maxSupply = newMaxSupply;
    }

    /**
     * @dev Retrieves the LandStats for a given tokenId.
     * @param tokenId The tokenId of the LandNFT.
     * @return The LandStats struct containing various statistics.
     */
    function getLandStats(uint256 tokenId) external view returns (DataTypes.LandStats memory) {
        require(_exists(tokenId), "Token does not exist");
        return landStats[tokenId];
    }

    /**
     * @dev Retrieves the coordinates for a given tokenId via the MapContract.
     * @param tokenId The tokenId of the LandNFT.
     * @return x The x-coordinate.
     * @return y The y-coordinate.
     */
    function getLandCoordinates(uint256 tokenId) external view returns (int256 x, int256 y) {
        require(_exists(tokenId), "Token does not exist");
        return mapContract.getTokenCoordinates(tokenId);
    }

    /**
     * @dev Updates land statistics for all tokens based on elapsed epochs.
     *      Only callable by the owner.
     */
    function updateEpoch() external onlyOwner nonReentrant {
        lastFlippedEpochTime = block.timestamp;
        uint256 timeElapsed = block.timestamp - lastEpochUpdateTime;
        uint256 epochsElapsed = timeElapsed / epochDuration;

        require(epochsElapsed > 0, "No epochs have passed since last update");

        for (uint256 tokenId = 1; tokenId < nextTokenId; tokenId++) {
            if (_exists(tokenId)) {
                _updateLandStats(tokenId, epochsElapsed);
            }
        }

        // Update the last epoch update time
        lastEpochUpdateTime += epochsElapsed * epochDuration;

        emit EpochUpdated(block.timestamp / epochDuration);
        lastFlippedEpochTime = block.timestamp;
    }

    /**
     * @dev Starts the construction of a building on a specific land parcel.
     *      Requires payment in both in-game resources and ERC20 tokens.
     * @param tokenId The tokenId of the LandNFT.
     * @param buildingName The name of the building to construct.
     * @param level The level of the building to construct.
     */
    function startBuildingConstruction(
        uint256 tokenId,
        string memory buildingName,
        uint256 level
    ) external nonReentrant {
        require(ownerOf(tokenId) == msg.sender, "Not the owner of this land");

        // Get building info
        BuildingManager.BuildingInfo memory building = buildingManager.getBuildingInfo(buildingName, level);

        // Check if the user has enough in-game resources
        require(
            hasSufficientResources(landStats[tokenId].resources, building.baseCost),
            "Not enough in-game resources"
        );

        // Corrected ERC20 token cost calculation
        // The ERC20 cost is equal to the gold cost, multiplied by 10^tokenDecimals
        uint256 erc20CostInUnits = building.baseCost.gold * (10 ** tokenDecimals); // e.g., 35 * 10^18 = 3,500,000,000 units

        // Check if user has enough ERC20 token balance
        require(
            erc20Token.balanceOf(msg.sender) >= erc20CostInUnits,
            "Not enough ERC20 tokens"
        );

        // Perform ERC20 token transfer from user to contract using SafeERC20
        erc20Token.safeTransferFrom(msg.sender, address(this), erc20CostInUnits);

        // Deduct in-game resources (food, wood, etc.)
        deductResources(landStats[tokenId].resources, building.baseCost);

        // Set building completion time
        uint256 completionTime = block.timestamp + building.baseConstructionTime;
        landStats[tokenId].constructions.push(
            DataTypes.BuildingUnderConstruction(buildingName, level, completionTime)
        );

        emit BuildingConstructionStarted(tokenId, buildingName, level, completionTime, erc20CostInUnits);
    }

    /**
     * @dev Completes any building constructions that have reached their completion time.
     *      Only callable by the owner of the land.
     * @param tokenId The tokenId of the LandNFT.
     */
    function completeBuildingConstruction(uint256 tokenId) external nonReentrant {
        require(ownerOf(tokenId) == msg.sender, "Not the owner of this land");

        // Retrieve the land stats for the given tokenId
        DataTypes.LandStats storage stats = landStats[tokenId];

        // Update the land stats before completing construction
        uint256 timeElapsed = block.timestamp - stats.lastResourceUpdate;
        uint256 epochsElapsed = timeElapsed / epochDuration;
        if (epochsElapsed > 0) {
            _updateLandStats(tokenId, epochsElapsed);
        }

        DataTypes.BuildingUnderConstruction[] storage constructions = landStats[tokenId].constructions;

        for (uint256 i = 0; i < constructions.length; ) {
            DataTypes.BuildingUnderConstruction memory construction = constructions[i];
            if (block.timestamp >= construction.completionTime) {
                BuildingManager.BuildingInfo memory building = buildingManager.getBuildingInfo(
                    construction.name,
                    construction.level
                );

                stats.production += building.productionBoost;
                stats.happiness += building.happinessBoost;
                stats.strength += building.strengthBoost;

                stats.buildings.push(
                    DataTypes.Building(construction.name, construction.level, true)
                );

                emit BuildingConstructionCompleted(tokenId, construction.name, construction.level);

                // Remove the completed construction by swapping with the last element and popping
                constructions[i] = constructions[constructions.length - 1];
                constructions.pop();
            } else {
                i++;
            }
        }
    }

    /**
     * @dev Sets a new mint price. Only callable by the owner.
     * @param newPrice The new mint price in wei.
     */
    function setMintPrice(uint256 newPrice) external onlyOwner {
        mintPrice = newPrice;
    }

    /**
     * @dev Withdraws all ERC20 tokens held by the contract to the owner's address.
     *      Only callable by the owner.
     */
    function withdrawERC20() external onlyOwner {
        uint256 balance = erc20Token.balanceOf(address(this));
        require(balance > 0, "No ERC20 tokens to withdraw");
        erc20Token.safeTransfer(owner(), balance);
    }

    /**
     * @dev Withdraws all ETH held by the contract to the owner's address.
     *      Only callable by the owner.
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        (bool success, ) = owner().call{value: balance}("");
        require(success, "ETH transfer failed");
    }

    /**
     * @dev Checks if the available resources are sufficient for the required resources.
     * @param available The available resources.
     * @param required The required resources.
     * @return True if available resources meet or exceed the required resources.
     */
    function hasSufficientResources(
        DataTypes.Resources memory available,
        DataTypes.Resources memory required
    ) internal pure returns (bool) {
        return
            available.food >= required.food &&
            available.wood >= required.wood &&
            available.stone >= required.stone &&
            available.brass >= required.brass &&
            available.iron >= required.iron &&
            available.gold >= required.gold;
    }

    /**
     * @dev Deducts the required resources from the available resources.
     * @param available The available resources (storage reference).
     * @param required The required resources.
     */
    function deductResources(
        DataTypes.Resources storage available,
        DataTypes.Resources memory required
    ) internal {
        available.food -= required.food;
        available.wood -= required.wood;
        available.stone -= required.stone;
        available.brass -= required.brass;
        available.iron -= required.iron;
        available.gold -= required.gold;
    }

    /**
     * @dev Applies upkeep costs for all active buildings on a land parcel.
     *      If resources are insufficient, the building is deactivated.
     * @param tokenId The tokenId of the LandNFT.
     */
    function _applyUpkeepCosts(uint256 tokenId) internal {
        DataTypes.LandStats storage stats = landStats[tokenId];

        for (uint256 i = 0; i < stats.buildings.length; i++) {
            DataTypes.Building storage building = stats.buildings[i];

            if (building.isActive) {
                BuildingManager.BuildingInfo memory buildingInfo = buildingManager.getBuildingInfo(building.name, building.level);

                DataTypes.Resources memory upkeepCost = buildingInfo.upkeepCost;

                bool canPayUpkeep = hasSufficientResources(stats.resources, upkeepCost);

                if (canPayUpkeep) {
                    deductResources(stats.resources, upkeepCost);
                } else {
                    building.isActive = false;

                    stats.production -= buildingInfo.productionBoost;
                    stats.happiness -= buildingInfo.happinessBoost;
                    stats.strength -= buildingInfo.strengthBoost;
                }
            }
        }
    }

    /**
     * @dev Updates the resources for a land parcel based on production and epochs elapsed.
     * @param tokenId The tokenId of the LandNFT.
     * @param epochsElapsed The number of epochs that have elapsed.
     */
    function _updateResources(uint256 tokenId, uint256 epochsElapsed) internal {
        DataTypes.LandStats storage stats = landStats[tokenId];

        DataTypes.Resources memory production = buildingManager.calculateTotalResourceProduction(stats.buildings, epochsElapsed);

        stats.resources.food += production.food;
        stats.resources.wood += production.wood;
        stats.resources.stone += production.stone;
        stats.resources.brass += production.brass;
        stats.resources.iron += production.iron;
        stats.resources.gold += production.gold;

        _applyUpkeepCosts(tokenId);
    }

/**
     * @dev Updates the land statistics for a specific land parcel.
     *      This function is called periodically to update resources, population, and happiness.
     * @param tokenId The tokenId of the LandNFT.
     * @param epochsElapsed The number of epochs that have elapsed since the last update.
     */
    function _updateLandStats(uint256 tokenId, uint256 epochsElapsed) internal {
        DataTypes.LandStats storage stats = landStats[tokenId];

        // 1. Update resources based on production and epochs elapsed
        _updateResources(tokenId, epochsElapsed);

        // 2. Calculate and apply population growth
        _updatePopulation(tokenId, epochsElapsed);

        // 3. Calculate and apply happiness adjustment
        _updateHappiness(tokenId, epochsElapsed);

        // 4. Update last resource update time for this token
        stats.lastResourceUpdate += epochsElapsed * epochDuration;
    }

    /**
     * @dev Handles population growth based on current happiness and other factors.
     * @param tokenId The tokenId of the LandNFT.
     * @param epochsElapsed The number of epochs that have elapsed.
     */
    function _updatePopulation(uint256 tokenId, uint256 epochsElapsed) internal {
        DataTypes.LandStats storage stats = landStats[tokenId];

        // Base population growth influenced by happiness
        if (stats.happiness > 50) {
            uint256 baseGrowthRate = stats.happiness - 50; // Base rate increases with happiness
            uint256 populationIncrease = (baseGrowthRate * stats.population * epochsElapsed) / 100;
            stats.population += populationIncrease;
        } else if (stats.happiness < 30 && stats.population > 50) {
            // Population decline if happiness is too low
            uint256 declineRate = (30 - stats.happiness);
            uint256 populationDecrease = (declineRate * stats.population * epochsElapsed) / 1000;
            if (stats.population > populationDecrease) {
                stats.population -= populationDecrease;
            } else {
                stats.population = 0;
            }
        }

        // Additional population adjustments based on buildings
        uint256 buildingPopulationBoost = _calculateBuildingBoost(tokenId, "population");
        if (buildingPopulationBoost > 0) {
            uint256 additionalGrowth = (buildingPopulationBoost * stats.population * epochsElapsed) / 1000;
            stats.population += additionalGrowth;
        }
    }

    /**
     * @dev Handles happiness adjustment based on resource ratios and building influences.
     * @param tokenId The tokenId of the LandNFT.
     * @param epochsElapsed The number of epochs that have elapsed.
     */
    function _updateHappiness(uint256 tokenId, uint256 epochsElapsed) internal {
        DataTypes.LandStats storage stats = landStats[tokenId];

        int256 happinessAdjustment = 0;

        uint256 population = stats.population;
        if (population == 0) {
            population = 1; // Avoid division by zero
        }

        // Calculate resource ratios as percentages
        uint256 foodRatio = (stats.resources.food * 100) / population;
        uint256 technologyRatio = (stats.technology * 100) / population;
        uint256 pietyRatio = (stats.piety * 100) / population;
        uint256 productionRatio = (stats.production * 100) / population;
        uint256 strengthRatio = (stats.strength * 100) / population;

        // 1. Resource-Based Happiness Adjustment
        // Food to population ratio
        if (foodRatio >= 200) {
            happinessAdjustment += 5;
        } else if (foodRatio >= 100) {
            happinessAdjustment += 2;
        } else {
            happinessAdjustment -= 5;
        }

        // Technology to population ratio
        if (technologyRatio >= 10) {
            happinessAdjustment += 2;
        } else {
            happinessAdjustment -= 2;
        }

        // Piety to population ratio
        if (pietyRatio >= 5) {
            happinessAdjustment += 1;
        } else {
            happinessAdjustment -= 1;
        }

        // Production to population ratio
        if (productionRatio >= 500) {
            happinessAdjustment += 4;
        } else if (productionRatio >= 100) {
            happinessAdjustment += 2;
        } else {
            happinessAdjustment -= 4;
        }

        // Strength to population ratio
        if (strengthRatio >= 20) {
            happinessAdjustment += 3;
        } else {
            happinessAdjustment -= 3;
        }

        // 2. Building-Based Happiness Adjustment
        uint256 buildingHappinessBoost = _calculateBuildingBoost(tokenId, "happiness");
        if (buildingHappinessBoost > 0) {
            happinessAdjustment += int256(buildingHappinessBoost / 10); // Scaling down to prevent overflows
        }

        // 3. Building Diversity Bonus
        uint256 uniqueBuildings = _countUniqueBuildingTypes(tokenId);
        if (uniqueBuildings >= 5) {
            happinessAdjustment += 2; // Bonus for diversity
        } else if (uniqueBuildings < 2) {
            happinessAdjustment -= 1; // Penalty for lack of diversity
        }

        // Apply happiness adjustment
        if (happinessAdjustment > 0) {
            uint256 happinessIncrease = uint256(happinessAdjustment) * epochsElapsed;
            stats.happiness += happinessIncrease;
        } else if (happinessAdjustment < 0) {
            uint256 decreaseAmount = uint256(-happinessAdjustment) * epochsElapsed;
            if (stats.happiness > decreaseAmount) {
                stats.happiness -= decreaseAmount;
            } else {
                stats.happiness = 0;
            }
        }

        // Ensure happiness does not exceed maximum (e.g., 100)
        if (stats.happiness > 100) {
            stats.happiness = 100;
        }
    }

    /**
     * @dev Calculates the cumulative boost for a specific stat from all active buildings.
     * @param tokenId The tokenId of the LandNFT.
     * @param stat The stat to calculate the boost for ("happiness", "population", etc.).
     * @return The total boost for the specified stat.
     */
    function _calculateBuildingBoost(uint256 tokenId, string memory stat) internal view returns (uint256) {
        DataTypes.LandStats storage stats = landStats[tokenId];
        uint256 totalBoost = 0;

        for (uint256 i = 0; i < stats.buildings.length; i++) {
            DataTypes.Building memory building = stats.buildings[i];
            if (building.isActive) {
                BuildingManager.BuildingInfo memory info = buildingManager.getBuildingInfo(building.name, building.level);
                if (keccak256(bytes(stat)) == keccak256(bytes("happiness"))) {
                    totalBoost += info.happinessBoost;
                } else if (keccak256(bytes(stat)) == keccak256(bytes("population"))) {
                    totalBoost += info.productionBoost; // Example: population influenced by production buildings
                }
                // Add more conditions if other stats need building-based boosts
            }
        }

        return totalBoost;
    }

    /**
     * @dev Counts the number of unique building types present on the land.
     *      This encourages diversity in building construction.
     * @param tokenId The tokenId of the LandNFT.
     * @return count The number of unique building types.
     */
    function _countUniqueBuildingTypes(uint256 tokenId) internal view returns (uint256 count) {
        DataTypes.LandStats storage stats = landStats[tokenId];
        string[] memory buildingNames = new string[](stats.buildings.length);
        uint256 uniqueCount = 0;

        for (uint256 i = 0; i < stats.buildings.length; i++) {
            bool isUnique = true;
            for (uint256 j = 0; j < uniqueCount; j++) {
                if (keccak256(bytes(stats.buildings[i].name)) == keccak256(bytes(buildingNames[j]))) {
                    isUnique = false;
                    break;
                }
            }
            if (isUnique) {
                buildingNames[uniqueCount] = stats.buildings[i].name;
                uniqueCount++;
            }
        }

        return uniqueCount;
    }
}
