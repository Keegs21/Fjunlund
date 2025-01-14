/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  DeployContractOptions,
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomicfoundation/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20Permit",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Permit__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "ERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721__factory>;
    getContractFactory(
      name: "ERC721Enumerable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721Enumerable__factory>;
    getContractFactory(
      name: "IERC721Enumerable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Enumerable__factory>;
    getContractFactory(
      name: "IERC721Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Metadata__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "IERC721Receiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721Receiver__factory>;
    getContractFactory(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "ArmyDeck",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ArmyDeck__factory>;
    getContractFactory(
      name: "IUnitNFT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUnitNFT__factory>;
    getContractFactory(
      name: "BuildingManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BuildingManager__factory>;
    getContractFactory(
      name: "LandNFT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LandNFT__factory>;
    getContractFactory(
      name: "Leaderboard",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Leaderboard__factory>;
    getContractFactory(
      name: "MapContract",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MapContract__factory>;
    getContractFactory(
      name: "ILandNFT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ILandNFT__factory>;
    getContractFactory(
      name: "MarketContract",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MarketContract__factory>;
    getContractFactory(
      name: "ILandNFT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ILandNFT__factory>;
    getContractFactory(
      name: "ILeaderboard",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ILeaderboard__factory>;
    getContractFactory(
      name: "RewardsDistributor",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RewardsDistributor__factory>;
    getContractFactory(
      name: "ILandNFT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ILandNFT__factory>;
    getContractFactory(
      name: "UnitNFT",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UnitNFT__factory>;

    getContractAt(
      name: "Ownable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "ERC20",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "IERC20Metadata",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20Permit",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Permit>;
    getContractAt(
      name: "IERC20",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "ERC721",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721>;
    getContractAt(
      name: "ERC721Enumerable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721Enumerable>;
    getContractAt(
      name: "IERC721Enumerable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Enumerable>;
    getContractAt(
      name: "IERC721Metadata",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Metadata>;
    getContractAt(
      name: "IERC721",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721>;
    getContractAt(
      name: "IERC721Receiver",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721Receiver>;
    getContractAt(
      name: "ERC165",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165>;
    getContractAt(
      name: "IERC165",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "ArmyDeck",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ArmyDeck>;
    getContractAt(
      name: "IUnitNFT",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IUnitNFT>;
    getContractAt(
      name: "BuildingManager",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.BuildingManager>;
    getContractAt(
      name: "LandNFT",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.LandNFT>;
    getContractAt(
      name: "Leaderboard",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Leaderboard>;
    getContractAt(
      name: "MapContract",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.MapContract>;
    getContractAt(
      name: "ILandNFT",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ILandNFT>;
    getContractAt(
      name: "MarketContract",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.MarketContract>;
    getContractAt(
      name: "ILandNFT",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ILandNFT>;
    getContractAt(
      name: "ILeaderboard",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ILeaderboard>;
    getContractAt(
      name: "RewardsDistributor",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.RewardsDistributor>;
    getContractAt(
      name: "ILandNFT",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ILandNFT>;
    getContractAt(
      name: "UnitNFT",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.UnitNFT>;

    deployContract(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Ownable>;
    deployContract(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC20>;
    deployContract(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Metadata>;
    deployContract(
      name: "IERC20Permit",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Permit>;
    deployContract(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20>;
    deployContract(
      name: "ERC721",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC721>;
    deployContract(
      name: "ERC721Enumerable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC721Enumerable>;
    deployContract(
      name: "IERC721Enumerable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721Enumerable>;
    deployContract(
      name: "IERC721Metadata",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721Metadata>;
    deployContract(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721>;
    deployContract(
      name: "IERC721Receiver",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721Receiver>;
    deployContract(
      name: "ERC165",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC165>;
    deployContract(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC165>;
    deployContract(
      name: "ArmyDeck",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ArmyDeck>;
    deployContract(
      name: "IUnitNFT",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUnitNFT>;
    deployContract(
      name: "BuildingManager",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.BuildingManager>;
    deployContract(
      name: "LandNFT",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.LandNFT>;
    deployContract(
      name: "Leaderboard",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Leaderboard>;
    deployContract(
      name: "MapContract",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.MapContract>;
    deployContract(
      name: "ILandNFT",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ILandNFT>;
    deployContract(
      name: "MarketContract",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.MarketContract>;
    deployContract(
      name: "ILandNFT",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ILandNFT>;
    deployContract(
      name: "ILeaderboard",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ILeaderboard>;
    deployContract(
      name: "RewardsDistributor",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.RewardsDistributor>;
    deployContract(
      name: "ILandNFT",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ILandNFT>;
    deployContract(
      name: "UnitNFT",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.UnitNFT>;

    deployContract(
      name: "Ownable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Ownable>;
    deployContract(
      name: "ERC20",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC20>;
    deployContract(
      name: "IERC20Metadata",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Metadata>;
    deployContract(
      name: "IERC20Permit",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20Permit>;
    deployContract(
      name: "IERC20",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC20>;
    deployContract(
      name: "ERC721",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC721>;
    deployContract(
      name: "ERC721Enumerable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC721Enumerable>;
    deployContract(
      name: "IERC721Enumerable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721Enumerable>;
    deployContract(
      name: "IERC721Metadata",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721Metadata>;
    deployContract(
      name: "IERC721",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721>;
    deployContract(
      name: "IERC721Receiver",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC721Receiver>;
    deployContract(
      name: "ERC165",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ERC165>;
    deployContract(
      name: "IERC165",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IERC165>;
    deployContract(
      name: "ArmyDeck",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ArmyDeck>;
    deployContract(
      name: "IUnitNFT",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUnitNFT>;
    deployContract(
      name: "BuildingManager",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.BuildingManager>;
    deployContract(
      name: "LandNFT",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.LandNFT>;
    deployContract(
      name: "Leaderboard",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Leaderboard>;
    deployContract(
      name: "MapContract",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.MapContract>;
    deployContract(
      name: "ILandNFT",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ILandNFT>;
    deployContract(
      name: "MarketContract",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.MarketContract>;
    deployContract(
      name: "ILandNFT",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ILandNFT>;
    deployContract(
      name: "ILeaderboard",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ILeaderboard>;
    deployContract(
      name: "RewardsDistributor",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.RewardsDistributor>;
    deployContract(
      name: "ILandNFT",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ILandNFT>;
    deployContract(
      name: "UnitNFT",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.UnitNFT>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
  }
}
