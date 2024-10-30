// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DataTypes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MapContract is Ownable {
    using DataTypes for DataTypes.Coordinates;

    address public landNFTAddress;
    mapping(int256 => mapping(int256 => uint256)) private coordinateToTokenId;
    mapping(uint256 => DataTypes.Coordinates) private tokenIdToCoordinates;

    uint256 public totalAssignedCoordinates;
    uint256 public constant MAX_OWNABLE_COORDINATES = 10000; // Max NFTs that can be owned

    // For a 100x100 grid to fit 10,000 NFTs
    int256 public constant GRID_WIDTH = 100;
    int256 public constant GRID_HEIGHT = 100;
    int256 public constant MIN_COORDINATE = 0;
    int256 public constant MAX_COORDINATE_X = GRID_WIDTH - 1;
    int256 public constant MAX_COORDINATE_Y = GRID_HEIGHT - 1;

    modifier onlyLandNFT() {
        require(msg.sender == landNFTAddress, "Only LandNFT contract can call");
        _;
    }

    function setLandNFTAddress(address _landNFTAddress) external onlyOwner {
        require(landNFTAddress == address(0), "LandNFT address already set");
        landNFTAddress = _landNFTAddress;
    }

    // Allow updating the LandNFT address
    function updateLandNFTAddress(address _newLandNFTAddress) external onlyOwner {
        require(_newLandNFTAddress != address(0), "Invalid address");
        landNFTAddress = _newLandNFTAddress;
    }

    // Assign coordinates for NFTs, ensuring they are ownable and not already assigned
    function assignCoordinate(uint256 tokenId, int256 x, int256 y) external onlyLandNFT {
        require(totalAssignedCoordinates < MAX_OWNABLE_COORDINATES, "All coordinates are assigned");
        require(x >= MIN_COORDINATE && x <= MAX_COORDINATE_X, "x coordinate out of range");
        require(y >= MIN_COORDINATE && y <= MAX_COORDINATE_Y, "y coordinate out of range");
        require(coordinateToTokenId[x][y] == 0, "Coordinate already occupied");

        coordinateToTokenId[x][y] = tokenId;
        tokenIdToCoordinates[tokenId] = DataTypes.Coordinates(x, y);
        totalAssignedCoordinates++;
    }

    function isCoordinateOccupied(int256 x, int256 y) public view returns (bool) {
        return coordinateToTokenId[x][y] != 0;
    }

    function getAvailableAdjacentCoordinates(int256 x, int256 y) public view returns (DataTypes.Coordinates[] memory) {
        uint256 count = 0;
        DataTypes.Coordinates[4] memory possibleCoords;

        // Check right
        if (x + 1 <= MAX_COORDINATE_X) {
            possibleCoords[count] = DataTypes.Coordinates(x + 1, y);
            count++;
        }
        // Check left
        if (x - 1 >= MIN_COORDINATE) {
            possibleCoords[count] = DataTypes.Coordinates(x - 1, y);
            count++;
        }
        // Check up
        if (y + 1 <= MAX_COORDINATE_Y) {
            possibleCoords[count] = DataTypes.Coordinates(x, y + 1);
            count++;
        }
        // Check down
        if (y - 1 >= MIN_COORDINATE) {
            possibleCoords[count] = DataTypes.Coordinates(x, y - 1);
            count++;
        }

        DataTypes.Coordinates[] memory adjacentCoords = new DataTypes.Coordinates[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < count; i++) {
            if (!isCoordinateOccupied(possibleCoords[i].x, possibleCoords[i].y)) {
                adjacentCoords[index] = possibleCoords[i];
                index++;
            }
        }

        DataTypes.Coordinates[] memory availableCoords = new DataTypes.Coordinates[](index);
        for (uint256 i = 0; i < index; i++) {
            availableCoords[i] = adjacentCoords[i];
        }

        return availableCoords;
    }

    function assignRandomCoordinate(uint256 tokenId) external onlyLandNFT returns (int256 x, int256 y) {
        require(totalAssignedCoordinates < MAX_OWNABLE_COORDINATES, "All ownable coordinates are assigned");
        uint256 maxAttempts = 100;

        for (uint256 i = 0; i < maxAttempts; i++) {
            int256 randX = int256(uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, tokenId, i))) % uint256(GRID_WIDTH));
            int256 randY = int256(uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, tokenId, i + 1))) % uint256(GRID_HEIGHT));

            if (!isCoordinateOccupied(randX, randY)) {
                coordinateToTokenId[randX][randY] = tokenId;
                tokenIdToCoordinates[tokenId] = DataTypes.Coordinates(randX, randY);
                totalAssignedCoordinates++;
                return (randX, randY);
            }
        }
        revert("No available random coordinates");
    }

    function assignAdjacentCoordinate(uint256 tokenId, uint256 existingTokenId) external onlyLandNFT returns (int256 x, int256 y) {
        require(totalAssignedCoordinates < MAX_OWNABLE_COORDINATES, "All ownable coordinates are assigned");
        DataTypes.Coordinates memory existingCoords = tokenIdToCoordinates[existingTokenId];
        DataTypes.Coordinates[] memory availableCoords = getAvailableAdjacentCoordinates(existingCoords.x, existingCoords.y);
        require(availableCoords.length > 0, "No available adjacent coordinates");

        DataTypes.Coordinates memory selectedCoord = availableCoords[0]; // Optionally, the user can choose from availableCoords
        coordinateToTokenId[selectedCoord.x][selectedCoord.y] = tokenId;
        tokenIdToCoordinates[tokenId] = selectedCoord;
        totalAssignedCoordinates++;
        return (selectedCoord.x, selectedCoord.y);
    }

    function getTokenCoordinates(uint256 tokenId) external view returns (int256 x, int256 y) {
        DataTypes.Coordinates memory coord = tokenIdToCoordinates[tokenId];
        return (coord.x, coord.y);
    }

    function getCoordinateTokenId(int256 x, int256 y) external view returns (uint256) {
        return coordinateToTokenId[x][y];
    }
}
