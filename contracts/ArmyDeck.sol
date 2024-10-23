// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./DataTypes.sol";

interface IUnitNFT {
    struct Unit {
        string name;
        uint256 attack;
        uint256 defense;
        uint256 speed;
        uint256 range;
        string abilities;
        DataTypes.Resources upkeepCost;
        bool isActive;
    }

    function ownerOf(uint256 tokenId) external view returns (address);
    function getUnitStats(uint256 tokenId) external view returns (Unit memory);
}


contract ArmyDeck is Ownable {
    // Reference to the UnitNFT contract
    IUnitNFT public unitNFTContract;

    // Mapping from user address to array of unit token IDs in their deck
    mapping(address => uint256[]) public userDecks;

    // Maximum number of units allowed in a deck
    uint8 public constant MAX_UNITS_IN_DECK = 7;

    // Events
    event UnitsAddedToDeck(address indexed user, uint256[] unitIds);
    event UnitsRemovedFromDeck(address indexed user, uint256[] unitIds);

    // Modifier to ensure only the deck owner can modify it
    modifier onlyDeckOwner(address user) {
        require(user == msg.sender, "Not the owner of the deck");
        _;
    }

    constructor(address _unitNFTAddress) {
        unitNFTContract = IUnitNFT(_unitNFTAddress);
    }

    // Function to add units to the user's deck
    function addUnitsToDeck(uint256[] calldata _unitIds) external {
        require(_unitIds.length > 0, "No units provided");
        uint256[] storage deck = userDecks[msg.sender];
        require(deck.length + _unitIds.length <= MAX_UNITS_IN_DECK, "Deck limit exceeded");

        for (uint256 i = 0; i < _unitIds.length; i++) {
            uint256 unitId = _unitIds[i];
            require(unitNFTContract.ownerOf(unitId) == msg.sender, "Not the owner of this unit");

            // Ensure the unit is not already in the deck
            require(!_isUnitInDeck(deck, unitId), "Unit already in deck");

            deck.push(unitId);
        }

        emit UnitsAddedToDeck(msg.sender, _unitIds);
    }

    // Function to remove units from the user's deck
    function removeUnitsFromDeck(uint256[] calldata _unitIds) external {
        require(_unitIds.length > 0, "No units provided");
        uint256[] storage deck = userDecks[msg.sender];
        require(deck.length >= _unitIds.length, "Not enough units in deck");

        for (uint256 i = 0; i < _unitIds.length; i++) {
            uint256 unitId = _unitIds[i];
            _removeUnitFromDeck(deck, unitId);
        }

        emit UnitsRemovedFromDeck(msg.sender, _unitIds);
    }

    // Function to get the user's deck
    function getUserDeck(address _user) external view returns (uint256[] memory) {
        return userDecks[_user];
    }

    // Function to get detailed info about the units in the user's deck
    function getUserDeckUnitDetails(address _user) external view returns (
        string[] memory names,
        uint256[] memory attacks,
        uint256[] memory defenses,
        uint256[] memory speeds,
        uint256[] memory ranges,
        string[] memory abilitiesList,
        bool[] memory isActives
    ) {
        uint256[] memory deck = userDecks[_user];
        uint256 deckLength = deck.length;

        names = new string[](deckLength);
        attacks = new uint256[](deckLength);
        defenses = new uint256[](deckLength);
        speeds = new uint256[](deckLength);
        ranges = new uint256[](deckLength);
        abilitiesList = new string[](deckLength);
        isActives = new bool[](deckLength);

        for (uint256 i = 0; i < deckLength; i++) {
            uint256 unitId = deck[i];
            IUnitNFT.Unit memory unit = unitNFTContract.getUnitStats(unitId);
            names[i] = unit.name;
            attacks[i] = unit.attack;
            defenses[i] = unit.defense;
            speeds[i] = unit.speed;
            ranges[i] = unit.range;
            abilitiesList[i] = unit.abilities;
            isActives[i] = unit.isActive;
        }
    }

    // Internal function to remove a unit from the deck
    function _removeUnitFromDeck(uint256[] storage deck, uint256 unitId) internal {
        for (uint256 i = 0; i < deck.length; i++) {
            if (deck[i] == unitId) {
                deck[i] = deck[deck.length - 1];
                deck.pop();
                return;
            }
        }
        revert("Unit not found in deck");
    }

    // Internal function to check if a unit is already in the deck
    function _isUnitInDeck(uint256[] storage deck, uint256 unitId) internal view returns (bool) {
        for (uint256 i = 0; i < deck.length; i++) {
            if (deck[i] == unitId) {
                return true;
            }
        }
        return false;
    }
}
