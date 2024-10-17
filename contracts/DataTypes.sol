// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

library DataTypes {

    struct Coordinates {
        int256 x;
        int256 y;
    }

    struct Resources {
        uint256 food;
        uint256 wood;
        uint256 stone;
        uint256 brass;
        uint256 iron;
        uint256 gold;
    }

    struct ResourceProduction {
        uint256 foodPerEpoch;
        uint256 woodPerEpoch;
        uint256 stonePerEpoch;
        uint256 brassPerEpoch;
        uint256 ironPerEpoch;
        uint256 goldPerEpoch;
    }

    struct BuildingUnderConstruction {
        string name;
        uint256 level;
        uint256 completionTime;
    }

    struct Building {
        string name;
        uint256 level;
        bool isActive;
    }

    struct LandStats {
        uint256 population;
        uint256 production;
        uint256 happiness;
        uint256 technology;
        uint256 piety;
        uint256 strength;
        Building[] buildings;
        BuildingUnderConstruction[] constructions;
        Resources resources;
        uint256 lastResourceUpdate;
    }

    struct BuildingInfo {
        string name;
        uint256 level;
        Resources baseCost;
        Resources upkeepCost;
        uint256 productionBoost;
        uint256 happinessBoost;
        uint256 technologyBoost;
        uint256 pietyBoost;
        uint256 strengthBoost;
        ResourceProduction resourceProduction;
        uint256 baseConstructionTime;
        bool isAvailable;
    }
}
