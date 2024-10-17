// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DataTypes.sol";

contract MapContract {
    using DataTypes for DataTypes.Coordinates;

    address public landNFTAddress;
    mapping(int256 => mapping(int256 => uint256)) private coordinateToTokenId;
    mapping(uint256 => DataTypes.Coordinates) private tokenIdToCoordinates;

    uint256 public totalAssignedCoordinates;
    uint256 public constant MAX_COORDINATES = 10000;

    int256 public constant GRID_SIZE = 100; // Grid size in one dimension
    int256 public constant MIN_COORDINATE = 0;
    int256 public constant MAX_COORDINATE = GRID_SIZE - 1;

    modifier onlyLandNFT() {
        require(msg.sender == landNFTAddress, "Only LandNFT contract can call");
        _;
    }

    function setLandNFTAddress(address _landNFTAddress) external {
        require(landNFTAddress == address(0), "LandNFT address already set");
        landNFTAddress = _landNFTAddress;
    }

    function assignCoordinate(uint256 tokenId, int256 x, int256 y) external onlyLandNFT {
        require(totalAssignedCoordinates < MAX_COORDINATES, "All coordinates are assigned");
        require(x >= MIN_COORDINATE && x <= MAX_COORDINATE, "x coordinate out of range");
        require(y >= MIN_COORDINATE && y <= MAX_COORDINATE, "y coordinate out of range");
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
        if (x + 1 <= MAX_COORDINATE) {
            possibleCoords[count] = DataTypes.Coordinates(x + 1, y);
            count++;
        }
        // Check left
        if (x - 1 >= MIN_COORDINATE) {
            possibleCoords[count] = DataTypes.Coordinates(x - 1, y);
            count++;
        }
        // Check up
        if (y + 1 <= MAX_COORDINATE) {
            possibleCoords[count] = DataTypes.Coordinates(x, y + 1);
            count++;
        }
        // Check down
        if (y - 1 >= MIN_COORDINATE) {
            possibleCoords[count] = DataTypes.Coordinates(x, y - 1);
            count++;
        }

        // Initialize the array with the exact size
        DataTypes.Coordinates[] memory adjacentCoords = new DataTypes.Coordinates[](count);
        uint256 index = 0;

        // Populate the array with available coordinates
        for (uint256 i = 0; i < count; i++) {
            if (!isCoordinateOccupied(possibleCoords[i].x, possibleCoords[i].y)) {
                adjacentCoords[index] = possibleCoords[i];
                index++;
            }
        }

        // Resize the array to the actual number of available coordinates
        DataTypes.Coordinates[] memory availableCoords = new DataTypes.Coordinates[](index);
        for (uint256 i = 0; i < index; i++) {
            availableCoords[i] = adjacentCoords[i];
        }

        return availableCoords;
    }

    function assignRandomCoordinate(uint256 tokenId) external onlyLandNFT returns (int256 x, int256 y) {
        require(totalAssignedCoordinates < MAX_COORDINATES, "All coordinates are assigned");
        uint256 maxAttempts = 100;

        for (uint256 i = 0; i < maxAttempts; i++) {
            int256 randX = int256(uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, tokenId, i))) % uint256(GRID_SIZE));
            int256 randY = int256(uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, tokenId, i + 1))) % uint256(GRID_SIZE));

            if (!isCoordinateOccupied(randX, randY)) {
                coordinateToTokenId[randX][randY] = tokenId;
                tokenIdToCoordinates[tokenId] = DataTypes.Coordinates(randX, randY);
                totalAssignedCoordinates++;
                return (randX, randY);
            }
        }
        revert("No available random coordinates");
    }

    function getTokenCoordinates(uint256 tokenId) external view returns (int256 x, int256 y) {
        DataTypes.Coordinates memory coord = tokenIdToCoordinates[tokenId];
        return (coord.x, coord.y);
    }

    // Additional function for frontend mapping
    function getCoordinateTokenId(int256 x, int256 y) external view returns (uint256) {
        return coordinateToTokenId[x][y];
    }
}
