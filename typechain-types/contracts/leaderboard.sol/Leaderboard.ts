/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export declare namespace Leaderboard {
  export type NFTScoreStruct = { tokenId: BigNumberish; score: BigNumberish };

  export type NFTScoreStructOutput = [tokenId: bigint, score: bigint] & {
    tokenId: bigint;
    score: bigint;
  };
}

export interface LeaderboardInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "depositERC20"
      | "distributeRewards"
      | "erc20Token"
      | "getLeaderboard"
      | "landNFT"
      | "leaderboard"
      | "nftIndex"
      | "owner"
      | "renounceOwnership"
      | "transferOwnership"
      | "updateLandNFT"
      | "updateLeaderboard"
      | "withdrawERC20"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "LeaderboardUpdated"
      | "OwnershipTransferred"
      | "RewardsDistributed"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "depositERC20",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "distributeRewards",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "erc20Token",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getLeaderboard",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "landNFT", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "leaderboard",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "nftIndex",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "updateLandNFT",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "updateLeaderboard",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawERC20",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "depositERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "distributeRewards",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "erc20Token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getLeaderboard",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "landNFT", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "leaderboard",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nftIndex", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateLandNFT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateLeaderboard",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawERC20",
    data: BytesLike
  ): Result;
}

export namespace LeaderboardUpdatedEvent {
  export type InputTuple = [];
  export type OutputTuple = [];
  export interface OutputObject {}
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RewardsDistributedEvent {
  export type InputTuple = [];
  export type OutputTuple = [];
  export interface OutputObject {}
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Leaderboard extends BaseContract {
  connect(runner?: ContractRunner | null): Leaderboard;
  waitForDeployment(): Promise<this>;

  interface: LeaderboardInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  depositERC20: TypedContractMethod<
    [amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  distributeRewards: TypedContractMethod<
    [rewards: BigNumberish[]],
    [void],
    "nonpayable"
  >;

  erc20Token: TypedContractMethod<[], [string], "view">;

  getLeaderboard: TypedContractMethod<
    [],
    [Leaderboard.NFTScoreStructOutput[]],
    "view"
  >;

  landNFT: TypedContractMethod<[], [string], "view">;

  leaderboard: TypedContractMethod<
    [arg0: BigNumberish],
    [[bigint, bigint] & { tokenId: bigint; score: bigint }],
    "view"
  >;

  nftIndex: TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  updateLandNFT: TypedContractMethod<
    [_newLandNFTAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  updateLeaderboard: TypedContractMethod<[], [void], "nonpayable">;

  withdrawERC20: TypedContractMethod<
    [amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "depositERC20"
  ): TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "distributeRewards"
  ): TypedContractMethod<[rewards: BigNumberish[]], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "erc20Token"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getLeaderboard"
  ): TypedContractMethod<[], [Leaderboard.NFTScoreStructOutput[]], "view">;
  getFunction(
    nameOrSignature: "landNFT"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "leaderboard"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [[bigint, bigint] & { tokenId: bigint; score: bigint }],
    "view"
  >;
  getFunction(
    nameOrSignature: "nftIndex"
  ): TypedContractMethod<[arg0: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "updateLandNFT"
  ): TypedContractMethod<
    [_newLandNFTAddress: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "updateLeaderboard"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdrawERC20"
  ): TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;

  getEvent(
    key: "LeaderboardUpdated"
  ): TypedContractEvent<
    LeaderboardUpdatedEvent.InputTuple,
    LeaderboardUpdatedEvent.OutputTuple,
    LeaderboardUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "RewardsDistributed"
  ): TypedContractEvent<
    RewardsDistributedEvent.InputTuple,
    RewardsDistributedEvent.OutputTuple,
    RewardsDistributedEvent.OutputObject
  >;

  filters: {
    "LeaderboardUpdated()": TypedContractEvent<
      LeaderboardUpdatedEvent.InputTuple,
      LeaderboardUpdatedEvent.OutputTuple,
      LeaderboardUpdatedEvent.OutputObject
    >;
    LeaderboardUpdated: TypedContractEvent<
      LeaderboardUpdatedEvent.InputTuple,
      LeaderboardUpdatedEvent.OutputTuple,
      LeaderboardUpdatedEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "RewardsDistributed()": TypedContractEvent<
      RewardsDistributedEvent.InputTuple,
      RewardsDistributedEvent.OutputTuple,
      RewardsDistributedEvent.OutputObject
    >;
    RewardsDistributed: TypedContractEvent<
      RewardsDistributedEvent.InputTuple,
      RewardsDistributedEvent.OutputTuple,
      RewardsDistributedEvent.OutputObject
    >;
  };
}