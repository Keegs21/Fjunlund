// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Import DataTypes library
import "./DataTypes.sol";

// Interface to interact with LandNFT without circular dependency
interface ILandNFT {
    function ownerOf(uint256 tokenId) external view returns (address);
}

contract UnitNFT is ERC721, Ownable {
    using DataTypes for DataTypes.Resources;

    uint256 public nextTokenId;

    // Unit struct with stats, upkeep cost, and active status
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

    // Mapping from tokenId to Unit
    mapping(uint256 => Unit) public tokenIdToUnit;

    // Predefined unit types
    mapping(string => Unit) public unitTypes;

    // Mapping from owner to list of owned token IDs
    mapping(address => uint256[]) public ownerToUnits;

    // Mapping from unit tokenId to land tokenId
    mapping(uint256 => uint256) public unitToLand;

    // Mapping from land tokenId to list of unit tokenIds
    mapping(uint256 => uint256[]) public landToUnits;

    // Reference to LandNFT contract
    ILandNFT public landNFTContract;

    // LandNFT contract address
    address public landNFTAddress;

    // Events
    event UnitMinted(address indexed owner, uint256 tokenId, string unitType, uint256 landTokenId);

    // Modifier to restrict functions to the LandNFT contract
    modifier onlyLandNFT() {
        require(msg.sender == landNFTAddress, "Caller is not LandNFT contract");
        _;
    }

    constructor(address _landNFTAddress) ERC721("Fjunlund Unit", "FJU") {
        nextTokenId = 1;
        _initializeUnitTypes();
        landNFTContract = ILandNFT(_landNFTAddress);
        landNFTAddress = _landNFTAddress;
    }

    // Initialize predefined unit types
    function _initializeUnitTypes() internal {
        // Footman
        unitTypes["Footman"] = Unit({
            name: "Footman",
            attack: 50,
            defense: 50,
            speed: 5,
            range: 1,
            abilities: "",
            upkeepCost: DataTypes.Resources({
                food: 5,
                wood: 1,
                stone: 0,
                brass: 0,
                iron: 0,
                gold: 0
            }),
            isActive: true
        });

        // Archer
        unitTypes["Archer"] = Unit({
            name: "Archer",
            attack: 40,
            defense: 30,
            speed: 5,
            range: 7,
            abilities: "Can attack flying units",
            upkeepCost: DataTypes.Resources({
                food: 4,
                wood: 2,
                stone: 0,
                brass: 0,
                iron: 0,
                gold: 0
            }),
            isActive: true
        });

        // Knight
        unitTypes["Knight"] = Unit({
            name: "Knight",
            attack: 70,
            defense: 60,
            speed: 7,
            range: 1,
            abilities: "Charge attack",
            upkeepCost: DataTypes.Resources({
                food: 6,
                wood: 0,
                stone: 0,
                brass: 0,
                iron: 3,
                gold: 0
            }),
            isActive: true
        });

        // Catapult
        unitTypes["Catapult"] = Unit({
            name: "Catapult",
            attack: 80,
            defense: 20,
            speed: 3,
            range: 10,
            abilities: "Area damage",
            upkeepCost: DataTypes.Resources({
                food: 0,
                wood: 5,
                stone: 5,
                brass: 0,
                iron: 0,
                gold: 0
            }),
            isActive: true
        });

        // Spearman
        unitTypes["Spearman"] = Unit({
            name: "Spearman",
            attack: 50,
            defense: 50,
            speed: 5,
            range: 1,
            abilities: "Bonus damage against cavalry",
            upkeepCost: DataTypes.Resources({
                food: 5,
                wood: 0,
                stone: 0,
                brass: 0,
                iron: 2,
                gold: 0
            }),
            isActive: true
        });

        // Wizard
        unitTypes["Wizard"] = Unit({
            name: "Wizard",
            attack: 50,
            defense: 40,
            speed: 5,
            range: 5,
            abilities: "Casts spells",
            upkeepCost: DataTypes.Resources({
                food: 5,
                wood: 0,
                stone: 0,
                brass: 0,
                iron: 0,
                gold: 3
            }),
            isActive: true
        });

        // Necromancer
        unitTypes["Necromancer"] = Unit({
            name: "Necromancer",
            attack: 30,
            defense: 30,
            speed: 4,
            range: 5,
            abilities: "Summons undead units",
            upkeepCost: DataTypes.Resources({
                food: 5,
                wood: 0,
                stone: 0,
                brass: 3,
                iron: 0,
                gold: 0
            }),
            isActive: true
        });

        // Goblin
        unitTypes["Goblin"] = Unit({
            name: "Goblin",
            attack: 35,
            defense: 25,
            speed: 8,
            range: 1,
            abilities: "Frenzy",
            upkeepCost: DataTypes.Resources({
                food: 3,
                wood: 0,
                stone: 0,
                brass: 1,
                iron: 0,
                gold: 0
            }),
            isActive: true
        });
    }

    // Mint a new unit and associate it with a land
    function mintUnit(string memory _unitType, uint256 _landTokenId) external {
        require(unitTypes[_unitType].attack != 0, "Unit type does not exist");
        require(landNFTContract.ownerOf(_landTokenId) == msg.sender, "Not the owner of this land");

        uint256 tokenId = nextTokenId;
        nextTokenId++;

        // Assign unit data to tokenId
        tokenIdToUnit[tokenId] = unitTypes[_unitType];

        // Associate unit with land
        unitToLand[tokenId] = _landTokenId;
        landToUnits[_landTokenId].push(tokenId);

        // Mint the NFT
        _safeMint(msg.sender, tokenId);

        emit UnitMinted(msg.sender, tokenId, _unitType, _landTokenId);
    }

   function getUnitStats(uint256 _tokenId) external view returns (
        string memory name,
        uint256 attack,
        uint256 defense,
        uint256 speed,
        uint256 range,
        string memory abilities,
        DataTypes.Resources memory upkeepCost,
        bool isActive
    ) {
        require(_exists(_tokenId), "Token does not exist");
        Unit memory unit = tokenIdToUnit[_tokenId];
        return (
            unit.name,
            unit.attack,
            unit.defense,
            unit.speed,
            unit.range,
            unit.abilities,
            unit.upkeepCost, // Added upkeepCost
            unit.isActive
        );
    }

    // Get units owned by a user
    function getUnitsByOwner(address _owner) external view returns (uint256[] memory) {
        return ownerToUnits[_owner];
    }

    // Get units associated with a land
    function getUnitsByLand(uint256 _landTokenId) external view returns (uint256[] memory) {
        return landToUnits[_landTokenId];
    }

    // Function to calculate total upkeep cost for a land
    function calculateTotalUpkeep(uint256 _landTokenId) external view returns (DataTypes.Resources memory totalUpkeep) {
        uint256[] memory unitIds = landToUnits[_landTokenId];
        for (uint256 i = 0; i < unitIds.length; i++) {
            Unit memory unit = tokenIdToUnit[unitIds[i]];
            if (unit.isActive) {
                totalUpkeep.food += unit.upkeepCost.food;
                totalUpkeep.wood += unit.upkeepCost.wood;
                totalUpkeep.stone += unit.upkeepCost.stone;
                totalUpkeep.brass += unit.upkeepCost.brass;
                totalUpkeep.iron += unit.upkeepCost.iron;
                totalUpkeep.gold += unit.upkeepCost.gold;
            }
        }
    }

    // Function to set unit active status (only callable by LandNFT contract)
    function setUnitActiveStatus(uint256 _tokenId, bool _status) external onlyLandNFT {
        require(_exists(_tokenId), "Unit does not exist");
        tokenIdToUnit[_tokenId].isActive = _status;
    }

    // Function to remove unit from owner's list upon transfer
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);

        if (from != address(0)) {
            // Remove from previous owner
            _removeUnitFromOwner(from, tokenId);
        }

        if (to != address(0)) {
            // Add to new owner
            ownerToUnits[to].push(tokenId);
        }

        // Update land association if necessary (units remain associated with the land)
    }

    // Internal function to remove a unit from owner's list
    function _removeUnitFromOwner(address _owner, uint256 _tokenId) internal {
        uint256[] storage units = ownerToUnits[_owner];
        for (uint256 i = 0; i < units.length; i++) {
            if (units[i] == _tokenId) {
                units[i] = units[units.length - 1];
                units.pop();
                break;
            }
        }
    }
}
