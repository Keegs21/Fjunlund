// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./BuildingManager.sol";
import "./DataTypes.sol";
import "./mapContract.sol";

contract LandNFT is ERC721Enumerable, Ownable, ReentrancyGuard {
    BuildingManager public buildingManager;
    MapContract public mapContract;

    using DataTypes for DataTypes.Resources;
    using DataTypes for DataTypes.ResourceProduction;
    using DataTypes for DataTypes.LandStats;
    using DataTypes for DataTypes.Building;
    using DataTypes for DataTypes.BuildingUnderConstruction;
    using DataTypes for DataTypes.BuildingInfo;

    uint256 public nextTokenId;
    uint256 public mintPrice;
    uint256 public epochDuration = 1 days;
    uint256 public maxSupply = 10000; // Initial maximum supply

    // Mapping from tokenId to LandStats
    mapping(uint256 => DataTypes.LandStats) private landStats;

    event Minted(address indexed owner, uint256 tokenId, int256 x, int256 y);
    event BuildingConstructionStarted(uint256 tokenId, string buildingName, uint256 level, uint256 completionTime);
    event BuildingConstructionCompleted(uint256 tokenId, string buildingName, uint256 level);
    event EpochUpdated(uint256 tokenId, DataTypes.LandStats stats);

    enum MintOption { RANDOM, ADJACENT }

    constructor(uint256 _mintPrice) ERC721("Fjunlund Land", "FJL") {
        mintPrice = _mintPrice;
        nextTokenId = 1;
    }

    // Function to set the BuildingManager after deployment
    function setBuildingManager(address _buildingManager) external onlyOwner {
        require(address(buildingManager) == address(0), "BuildingManager already set");
        buildingManager = BuildingManager(_buildingManager);
    }

    // Function to set the MapContract after deployment
    function setMapContract(address _mapContract) external onlyOwner {
        require(address(mapContract) == address(0), "MapContract already set");
        mapContract = MapContract(_mapContract);
    }

    // Mint a new LandNFT
    function mint(MintOption option, uint256 existingTokenId, int256 x, int256 y) external payable nonReentrant {
        require(msg.value >= mintPrice, "Insufficient payment");
        require(address(mapContract) != address(0), "MapContract not set");
        require(nextTokenId <= maxSupply, "Maximum supply reached");

        uint256 tokenId = nextTokenId;
        nextTokenId++;

        _safeMint(msg.sender, tokenId);

        // Initialize land stats with default values
        DataTypes.LandStats storage stats = landStats[tokenId];

        stats.population = 100;
        stats.production = 50;
        stats.happiness = 50;
        stats.technology = 0;
        stats.piety = 0;
        stats.strength = 10;
        stats.resources = DataTypes.Resources({
            food: 500,
            wood: 300,
            stone: 200,
            brass: 0,
            iron: 100,
            gold: 50
        });
        stats.lastResourceUpdate = block.timestamp;

        // Assign coordinates via MapContract
        if (option == MintOption.ADJACENT) {
            require(ownerOf(existingTokenId) == msg.sender, "Not the owner of the existing land");
            (int256 existingX, int256 existingY) = mapContract.getTokenCoordinates(existingTokenId);
            DataTypes.Coordinates[] memory availableCoords = mapContract.getAvailableAdjacentCoordinates(existingX, existingY);
            require(availableCoords.length > 0, "No adjacent coordinates available");

            // Optionally, you can let the user pick from availableCoords. For simplicity, we'll pick the first one
            DataTypes.Coordinates memory selectedCoord = availableCoords[0];
            mapContract.assignCoordinate(tokenId, selectedCoord.x, selectedCoord.y);
            emit Minted(msg.sender, tokenId, selectedCoord.x, selectedCoord.y);
        } else if (option == MintOption.RANDOM) {
            (int256 randX, int256 randY) = mapContract.assignRandomCoordinate(tokenId);
            emit Minted(msg.sender, tokenId, randX, randY);
        } else {
            // If coordinates are provided, use them
            require(!mapContract.isCoordinateOccupied(x, y), "Coordinates already occupied");
            mapContract.assignCoordinate(tokenId, x, y);
            emit Minted(msg.sender, tokenId, x, y);
        }

        // Add a pre-built Farm building (level 1) to the land
        DataTypes.Building memory farmBuilding = DataTypes.Building({
            name: "Farm",
            level: 1,
            isActive: true
        });
        stats.buildings.push(farmBuilding);

        // Apply the boosts from the Farm building
        BuildingManager.BuildingInfo memory farmInfo = buildingManager.getBuildingInfo("Farm", 1);
        stats.production += farmInfo.productionBoost;
        stats.happiness += farmInfo.happinessBoost;
        stats.strength += farmInfo.strengthBoost;
    }

    // Function to increase the maximum supply (onlyOwner)
    function increaseMaxSupply(uint256 newMaxSupply) external onlyOwner {
        require(newMaxSupply > maxSupply, "New max supply must be greater than current max supply");
        maxSupply = newMaxSupply;
    }

    // Get LandStats for a tokenId
    function getLandStats(uint256 tokenId) external view returns (DataTypes.LandStats memory) {
        require(_exists(tokenId), "Token does not exist");
        return landStats[tokenId];
    }

    // Get the coordinates for a given tokenId via MapContract
    function getLandCoordinates(uint256 tokenId) external view returns (int256 x, int256 y) {
        require(_exists(tokenId), "Token does not exist");
        return mapContract.getTokenCoordinates(tokenId);
    }

    // Function to update stats at the end of each epoch
    function updateEpoch(uint256 tokenId) external nonReentrant {
        require(_exists(tokenId), "Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "Not the owner of this land");

        _updateLandStats(tokenId);
    }

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

    function _updateResources(uint256 tokenId) internal {
        DataTypes.LandStats storage stats = landStats[tokenId];
        uint256 timeElapsed = block.timestamp - stats.lastResourceUpdate;
        uint256 epochsElapsed = timeElapsed / epochDuration;

        if (epochsElapsed > 0) {
            DataTypes.Resources memory production = buildingManager.calculateTotalResourceProduction(stats.buildings, epochsElapsed);

            stats.resources.food += production.food;
            stats.resources.wood += production.wood;
            stats.resources.stone += production.stone;
            stats.resources.brass += production.brass;
            stats.resources.iron += production.iron;
            stats.resources.gold += production.gold;

            _applyUpkeepCosts(tokenId);
            stats.lastResourceUpdate += epochsElapsed * epochDuration;
        }
    }

    function _updateLandStats(uint256 tokenId) internal {
        DataTypes.LandStats storage stats = landStats[tokenId];

        _updateResources(tokenId);

        if (stats.happiness > 50) {
            uint256 populationIncrease = (stats.happiness - 50) * stats.population / 100;
            stats.population += populationIncrease;
        }

        if (stats.happiness > 5) {
            stats.happiness -= 5;
        } else {
            stats.happiness = 0;
        }

        emit EpochUpdated(tokenId, stats);
    }

    function startBuildingConstruction(uint256 tokenId, string memory buildingName, uint256 level) external nonReentrant {
        require(ownerOf(tokenId) == msg.sender, "Not the owner of this land");

        BuildingManager.BuildingInfo memory building = buildingManager.getBuildingInfo(buildingName, level);

        _updateResources(tokenId);

        require(hasSufficientResources(landStats[tokenId].resources, building.baseCost), "Not enough resources");

        deductResources(landStats[tokenId].resources, building.baseCost);

        uint256 completionTime = block.timestamp + building.baseConstructionTime;
        landStats[tokenId].constructions.push(DataTypes.BuildingUnderConstruction(buildingName, level, completionTime));

        emit BuildingConstructionStarted(tokenId, buildingName, level, completionTime);
    }

    function completeBuildingConstruction(uint256 tokenId) external nonReentrant {
        require(ownerOf(tokenId) == msg.sender, "Not the owner of this land");

        _updateResources(tokenId);

        DataTypes.BuildingUnderConstruction[] storage constructions = landStats[tokenId].constructions;

        for (uint256 i = 0; i < constructions.length; ) {
            DataTypes.BuildingUnderConstruction memory construction = constructions[i];
            if (block.timestamp >= construction.completionTime) {
                BuildingManager.BuildingInfo memory building = buildingManager.getBuildingInfo(construction.name, construction.level);

                landStats[tokenId].production += building.productionBoost;
                landStats[tokenId].happiness += building.happinessBoost;
                landStats[tokenId].strength += building.strengthBoost;

                landStats[tokenId].buildings.push(DataTypes.Building(construction.name, construction.level, true));

                // Remove the completed construction
                constructions[i] = constructions[constructions.length - 1];
                constructions.pop();
            } else {
                i++;
            }
        }
    }

    // Owner can set a new mint price
    function setMintPrice(uint256 newPrice) external onlyOwner {
        mintPrice = newPrice;
    }

    // Withdraw contract balance to owner
    function withdraw() external onlyOwner {
        (bool success, ) = owner().call{value: address(this).balance}("");
        require(success, "Transfer failed");
    }

    // Helper functions
    function hasSufficientResources(DataTypes.Resources memory available, DataTypes.Resources memory required) internal pure returns (bool) {
        return available.food >= required.food &&
               available.wood >= required.wood &&
               available.stone >= required.stone &&
               available.brass >= required.brass &&
               available.iron >= required.iron &&
               available.gold >= required.gold;
    }

    function deductResources(DataTypes.Resources storage available, DataTypes.Resources memory required) internal {
        available.food -= required.food;
        available.wood -= required.wood;
        available.stone -= required.stone;
        available.brass -= required.brass;
        available.iron -= required.iron;
        available.gold -= required.gold;
    }
}
