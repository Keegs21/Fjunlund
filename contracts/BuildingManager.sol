// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DataTypes.sol";
import "./landNFT.sol";

contract BuildingManager {
    using DataTypes for DataTypes.Resources;
    using DataTypes for DataTypes.ResourceProduction;
    using DataTypes for DataTypes.LandStats;
    using DataTypes for DataTypes.Building;
    using DataTypes for DataTypes.BuildingUnderConstruction;
    using DataTypes for DataTypes.BuildingInfo;

    address public landNFT;  // Set the address after deployment

    constructor() {
        _initializeBuildings();
    }

    function setLandNFT(address _landNFT) external {
        require(landNFT == address(0), "LandNFT is already set");
        landNFT = _landNFT;
    }

    struct BuildingInfo {
        string name;
        uint256 level;
        DataTypes.Resources baseCost;
        DataTypes.Resources upkeepCost;
        uint256 productionBoost;
        uint256 happinessBoost;
        uint256 technologyBoost;
        uint256 pietyBoost;
        uint256 strengthBoost;
        DataTypes.ResourceProduction resourceProduction;
        uint256 baseConstructionTime;
        bool isAvailable;
    }

    mapping(string => mapping(uint256 => BuildingInfo)) public availableBuildings;

    function calculateUpkeepCost(DataTypes.Resources memory baseCost) internal pure returns (DataTypes.Resources memory) {
        return DataTypes.Resources({
            food: baseCost.food * 5 / 100,
            wood: baseCost.wood * 5 / 100,
            stone: baseCost.stone * 5 / 100,
            brass: baseCost.brass * 5 / 100,
            iron: baseCost.iron * 5 / 100,
            gold: baseCost.gold * 5 / 100
        });
    }

    function _initializeBuildings() internal {
        // Low Output Buildings (Level 1)
        availableBuildings["Farm"][1] = BuildingInfo({
            name: "Farm",
            level: 1,
            baseCost: DataTypes.Resources(100, 50, 30, 0, 0, 20),
            upkeepCost: calculateUpkeepCost(DataTypes.Resources(100, 50, 30, 0, 0, 20)),
            productionBoost: 5,
            happinessBoost: 2,
            technologyBoost: 0,
            pietyBoost: 0,
            strengthBoost: 0,
            resourceProduction: DataTypes.ResourceProduction(100, 0, 0, 0, 0, 0),
            baseConstructionTime: 12 hours,
            isAvailable: true
        });

        availableBuildings["Lumber Mill"][1] = BuildingInfo({
            name: "Lumber Mill",
            level: 1,
            baseCost: DataTypes.Resources(80, 60, 40, 0, 0, 25),
            upkeepCost: calculateUpkeepCost(DataTypes.Resources(80, 60, 40, 0, 0, 25)),
            productionBoost: 4,
            happinessBoost: 0,
            technologyBoost: 0,
            pietyBoost: 0,
            strengthBoost: 0,
            resourceProduction: DataTypes.ResourceProduction(0, 100, 0, 0, 0, 0),
            baseConstructionTime: 12 hours,
            isAvailable: true
        });

        availableBuildings["Quarry"][1] = BuildingInfo({
            name: "Quarry",
            level: 1,
            baseCost: DataTypes.Resources(90, 40, 50, 0, 0, 30),
            upkeepCost: calculateUpkeepCost(DataTypes.Resources(90, 40, 50, 0, 0, 30)),
            productionBoost: 3,
            happinessBoost: 0,
            technologyBoost: 0,
            pietyBoost: 0,
            strengthBoost: 0,
            resourceProduction: DataTypes.ResourceProduction(0, 0, 100, 0, 0, 0),
            baseConstructionTime: 12 hours,
            isAvailable: true
        });

        availableBuildings["Iron Mine"][1] = BuildingInfo({
            name: "Iron Mine",
            level: 1,
            baseCost: DataTypes.Resources(100, 50, 60, 0, 0, 35),
            upkeepCost: calculateUpkeepCost(DataTypes.Resources(100, 50, 60, 0, 0, 35)),
            productionBoost: 3,
            happinessBoost: 0,
            technologyBoost: 0,
            pietyBoost: 0,
            strengthBoost: 2,
            resourceProduction: DataTypes.ResourceProduction(0, 0, 0, 0, 100, 0),
            baseConstructionTime: 12 hours,
            isAvailable: true
        });

        availableBuildings["Workshop"][1] = BuildingInfo({
            name: "Workshop",
            level: 1,
            baseCost: DataTypes.Resources(110, 60, 40, 0, 0, 40),
            upkeepCost: calculateUpkeepCost(DataTypes.Resources(110, 60, 40, 0, 0, 40)),
            productionBoost: 5,
            happinessBoost: 0,
            technologyBoost: 3,
            pietyBoost: 0,
            strengthBoost: 0,
            resourceProduction: DataTypes.ResourceProduction(0, 0, 0, 100, 0, 0),
            baseConstructionTime: 12 hours,
            isAvailable: true
        });

        availableBuildings["Marketplace"][1] = BuildingInfo({
            name: "Marketplace",
            level: 1,
            baseCost: DataTypes.Resources(120, 50, 50, 0, 0, 50),
            upkeepCost: calculateUpkeepCost(DataTypes.Resources(120, 50, 50, 0, 0, 50)),
            productionBoost: 0,
            happinessBoost: 3,
            technologyBoost: 0,
            pietyBoost: 2,
            strengthBoost: 0,
            resourceProduction: DataTypes.ResourceProduction(0, 0, 0, 0, 0, 100),
            baseConstructionTime: 12 hours,
            isAvailable: true
        });

        availableBuildings["Barracks"][1] = BuildingInfo({
            name: "Barracks",
            level: 1,
            baseCost: DataTypes.Resources(130, 70, 60, 0, 0, 60),
            upkeepCost: calculateUpkeepCost(DataTypes.Resources(130, 70, 60, 0, 0, 60)),
            productionBoost: 0,
            happinessBoost: 0,
            technologyBoost: 0,
            pietyBoost: 0,
            strengthBoost: 5,
            resourceProduction: DataTypes.ResourceProduction(0, 0, 0, 0, 0, 0),
            baseConstructionTime: 12 hours,
            isAvailable: true
        });

        availableBuildings["Temple"][1] = BuildingInfo({
            name: "Temple",
            level: 1,
            baseCost: DataTypes.Resources(140, 60, 70, 0, 0, 70),
            upkeepCost: calculateUpkeepCost(DataTypes.Resources(140, 60, 70, 0, 0, 70)),
            productionBoost: 0,
            happinessBoost: 5,
            technologyBoost: 0,
            pietyBoost: 7,
            strengthBoost: 0,
            resourceProduction: DataTypes.ResourceProduction(0, 0, 0, 0, 0, 0),
            baseConstructionTime: 12 hours,
            isAvailable: true
        });

        availableBuildings["Academy"][1] = BuildingInfo({
            name: "Academy",
            level: 1,
            baseCost: DataTypes.Resources(150, 80, 50, 0, 0, 80),
            upkeepCost: calculateUpkeepCost(DataTypes.Resources(150, 80, 50, 0, 0, 80)),
            productionBoost: 5,
            happinessBoost: 2,
            technologyBoost: 5,
            pietyBoost: 0,
            strengthBoost: 0,
            resourceProduction: DataTypes.ResourceProduction(0, 0, 0, 0, 0, 0),
            baseConstructionTime: 12 hours,
            isAvailable: true
        });

        availableBuildings["Stables"][1] = BuildingInfo({
            name: "Stables",
            level: 1,
            baseCost: DataTypes.Resources(160, 90, 80, 0, 0, 90),
            upkeepCost: calculateUpkeepCost(DataTypes.Resources(160, 90, 80, 0, 0, 90)),
            productionBoost: 0,
            happinessBoost: 0,
            technologyBoost: 0,
            pietyBoost: 0,
            strengthBoost: 3,
            resourceProduction: DataTypes.ResourceProduction(0, 0, 0, 0, 0, 0),
            baseConstructionTime: 12 hours,
            isAvailable: true
        });

        // High Output Buildings (Level 2) with enhanced stats
        availableBuildings["Estate"][2] = BuildingInfo({
            name: "Estate",
            level: 2,
            baseCost: DataTypes.Resources(200, 100, 60, 0, 0, 40),
            upkeepCost: calculateUpkeepCost(DataTypes.Resources(200, 100, 60, 0, 0, 40)),
            productionBoost: 10,
            happinessBoost: 4,
            technologyBoost: 0,
            pietyBoost: 0,
            strengthBoost: 0,
            resourceProduction: DataTypes.ResourceProduction(200, 0, 0, 0, 0, 0),
            baseConstructionTime: 24 hours,
            isAvailable: true
        });

        availableBuildings["University"][2] = BuildingInfo({
            name: "University",
            level: 2,
            baseCost: DataTypes.Resources(300, 160, 100, 0, 0, 160),
            upkeepCost: calculateUpkeepCost(DataTypes.Resources(300, 160, 100, 0, 0, 160)),
            productionBoost: 10,
            happinessBoost: 4,
            technologyBoost: 10,
            pietyBoost: 0,
            strengthBoost: 0,
            resourceProduction: DataTypes.ResourceProduction(0, 0, 0, 0, 0, 0),
            baseConstructionTime: 24 hours,
            isAvailable: true
        });

        availableBuildings["Cathedral"][2] = BuildingInfo({
            name: "Cathedral",
            level: 2,
            baseCost: DataTypes.Resources(280, 120, 140, 0, 0, 140),
            upkeepCost: calculateUpkeepCost(DataTypes.Resources(280, 120, 140, 0, 0, 140)),
            productionBoost: 0,
            happinessBoost: 10,
            technologyBoost: 0,
            pietyBoost: 10,
            strengthBoost: 0,
            resourceProduction: DataTypes.ResourceProduction(0, 0, 0, 0, 0, 0),
            baseConstructionTime: 24 hours,
            isAvailable: true
        });
        availableBuildings["Sawmill"][2] = BuildingInfo({
            name: "Sawmill",
            level: 2,
            baseCost: DataTypes.Resources(160, 120, 80, 0, 0, 50),
            upkeepCost: calculateUpkeepCost(DataTypes.Resources(160, 120, 80, 0, 0, 50)),
            productionBoost: 8,
            happinessBoost: 0,
            technologyBoost: 0,
            pietyBoost: 0,
            strengthBoost: 0,
            resourceProduction: DataTypes.ResourceProduction(0, 200, 0, 0, 0, 0),
            baseConstructionTime: 24 hours,
            isAvailable: true
        });

        availableBuildings["Stoneworks"][2] = BuildingInfo({
            name: "Stoneworks",
            level: 2,
            baseCost: DataTypes.Resources(180, 80, 100, 0, 0, 60),
            upkeepCost: calculateUpkeepCost(DataTypes.Resources(180, 80, 100, 0, 0, 60)),
            productionBoost: 6,
            happinessBoost: 0,
            technologyBoost: 0,
            pietyBoost: 0,
            strengthBoost: 0,
            resourceProduction: DataTypes.ResourceProduction(0, 0, 200, 0, 0, 0),
            baseConstructionTime: 24 hours,
            isAvailable: true
        });

        availableBuildings["Steelworks"][2] = BuildingInfo({
            name: "Steelworks",
            level: 2,
            baseCost: DataTypes.Resources(200, 100, 120, 0, 0, 70),
            upkeepCost: calculateUpkeepCost(DataTypes.Resources(200, 100, 120, 0, 0, 70)),
            productionBoost: 6,
            happinessBoost: 0,
            technologyBoost: 0,
            pietyBoost: 0,
            strengthBoost: 0,
            resourceProduction: DataTypes.ResourceProduction(0, 0, 0, 0, 200, 0),
            baseConstructionTime: 24 hours,
            isAvailable: true
        });

        availableBuildings["Factory"][2] = BuildingInfo({
            name: "Factory",
            level: 2,
            baseCost: DataTypes.Resources(220, 120, 80, 0, 0, 80),
            upkeepCost: calculateUpkeepCost(DataTypes.Resources(220, 120, 80, 0, 0, 80)),
            productionBoost: 10,
            happinessBoost: 0,
            technologyBoost: 0,
            pietyBoost: 0,
            strengthBoost: 0,
            resourceProduction: DataTypes.ResourceProduction(0, 0, 0, 200, 0, 0),
            baseConstructionTime: 24 hours,
            isAvailable: true
        });

        availableBuildings["Trading Post"][2] = BuildingInfo({
            name: "Trading Post",
            level: 2,
            baseCost: DataTypes.Resources(240, 100, 100, 0, 0, 100),
            upkeepCost: calculateUpkeepCost(DataTypes.Resources(240, 100, 100, 0, 0, 100)),
            productionBoost: 0,
            happinessBoost: 6,
            technologyBoost: 0,
            pietyBoost: 2,
            strengthBoost: 0,
            resourceProduction: DataTypes.ResourceProduction(0, 0, 0, 0, 0, 200),
            baseConstructionTime: 24 hours,
            isAvailable: true
        });

        availableBuildings["Fortress"][2] = BuildingInfo({
            name: "Fortress",
            level: 2,
            baseCost: DataTypes.Resources(260, 140, 120, 0, 0, 120),
            upkeepCost: calculateUpkeepCost(DataTypes.Resources(260, 140, 120, 0, 0, 120)),
            productionBoost: 0,
            happinessBoost: 0,
            technologyBoost: 0,
            pietyBoost: 0,
            strengthBoost: 10,
            resourceProduction: DataTypes.ResourceProduction(0, 0, 0, 0, 0, 0),
            baseConstructionTime: 24 hours,
            isAvailable: true
        });

        availableBuildings["Cavalry School"][2] = BuildingInfo({
            name: "Cavalry School",
            level: 2,
            baseCost: DataTypes.Resources(320, 180, 160, 0, 0, 180),
            upkeepCost: calculateUpkeepCost(DataTypes.Resources(320, 180, 160, 0, 0, 180)),
            productionBoost: 0,
            happinessBoost: 0,
            technologyBoost: 0,
            pietyBoost: 0,
            strengthBoost: 6,
            resourceProduction: DataTypes.ResourceProduction(0, 0, 0, 0, 0, 0),
            baseConstructionTime: 24 hours,
            isAvailable: true
        });

    }

    // Start constructing a building
    function startBuildingConstruction(
        string memory buildingName, 
        uint256 level, 
        DataTypes.Resources memory currentResources, 
        uint256 production
    ) external view returns (DataTypes.Resources memory updatedResources, uint256 completionTime) {
        require(bytes(buildingName).length > 0, "Invalid building name");
        BuildingInfo storage building = availableBuildings[buildingName][level];
        require(building.isAvailable, "Building not available");

        // Check if the land has enough resources
        require(currentResources.food >= building.baseCost.food, "Not enough food");
        require(currentResources.wood >= building.baseCost.wood, "Not enough wood");
        require(currentResources.stone >= building.baseCost.stone, "Not enough stone");
        require(currentResources.brass >= building.baseCost.brass, "Not enough brass");
        require(currentResources.iron >= building.baseCost.iron, "Not enough iron");
        require(currentResources.gold >= building.baseCost.gold, "Not enough gold");

        // Deduct resource costs
        updatedResources = currentResources;
        updatedResources.food -= building.baseCost.food;
        updatedResources.wood -= building.baseCost.wood;
        updatedResources.stone -= building.baseCost.stone;
        updatedResources.brass -= building.baseCost.brass;
        updatedResources.iron -= building.baseCost.iron;
        updatedResources.gold -= building.baseCost.gold;

        // Calculate construction time based on production stat
        uint256 adjustedTime = building.baseConstructionTime * 50 / production;
        if (adjustedTime < 1 hours) {
            adjustedTime = 1 hours; // Minimum construction time
        } else if (adjustedTime > 2 days) {
            adjustedTime = 2 days; // Maximum construction time
        }
        completionTime = block.timestamp + adjustedTime;
    }


    // Complete construction of buildings that are done
    function completeBuildingConstruction(
        string memory buildingName,
        uint256 level
    ) external view returns (uint256 productionBoost, uint256 happinessBoost, uint256 strengthBoost) {
        BuildingInfo storage building = availableBuildings[buildingName][level];
        productionBoost = building.productionBoost;
        happinessBoost = building.happinessBoost;
        strengthBoost = building.strengthBoost;
    }

    function calculateTotalResourceProduction(DataTypes.Building[] memory buildings, uint256 epochsElapsed) external view returns (DataTypes.Resources memory) {
        DataTypes.Resources memory totalProduction;

        // Loop through the buildings and calculate resource production for each
        for (uint256 i = 0; i < buildings.length; i++) {
            DataTypes.Building memory buildingInstance = buildings[i];

            if (buildingInstance.isActive) {
                // Fetch building info based on name and level
                BuildingInfo memory buildingInfo = availableBuildings[buildingInstance.name][buildingInstance.level];
                DataTypes.ResourceProduction memory rp = buildingInfo.resourceProduction;

                // Aggregate resource production for each active building
                totalProduction.food += rp.foodPerEpoch * epochsElapsed;
                totalProduction.wood += rp.woodPerEpoch * epochsElapsed;
                totalProduction.stone += rp.stonePerEpoch * epochsElapsed;
                totalProduction.brass += rp.brassPerEpoch * epochsElapsed;
                totalProduction.iron += rp.ironPerEpoch * epochsElapsed;
                totalProduction.gold += rp.goldPerEpoch * epochsElapsed;
            }
        }

        return totalProduction;
    }

    function getBuildingInfo(string memory name, uint256 level) public view returns (BuildingInfo memory) {
        return availableBuildings[name][level];
    }
}
