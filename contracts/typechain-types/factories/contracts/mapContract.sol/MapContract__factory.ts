/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  MapContract,
  MapContractInterface,
} from "../../../contracts/mapContract.sol/MapContract";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "GRID_HEIGHT",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "GRID_WIDTH",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_COORDINATE_X",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_COORDINATE_Y",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_OWNABLE_COORDINATES",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MIN_COORDINATE",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "existingTokenId",
        type: "uint256",
      },
    ],
    name: "assignAdjacentCoordinate",
    outputs: [
      {
        internalType: "int256",
        name: "x",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "y",
        type: "int256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "x",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "y",
        type: "int256",
      },
    ],
    name: "assignCoordinate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "assignRandomCoordinate",
    outputs: [
      {
        internalType: "int256",
        name: "x",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "y",
        type: "int256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "x",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "y",
        type: "int256",
      },
    ],
    name: "getAvailableAdjacentCoordinates",
    outputs: [
      {
        components: [
          {
            internalType: "int256",
            name: "x",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "y",
            type: "int256",
          },
        ],
        internalType: "struct DataTypes.Coordinates[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "x",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "y",
        type: "int256",
      },
    ],
    name: "getCoordinateTokenId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getTokenCoordinates",
    outputs: [
      {
        internalType: "int256",
        name: "x",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "y",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "x",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "y",
        type: "int256",
      },
    ],
    name: "isCoordinateOccupied",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "landNFTAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_landNFTAddress",
        type: "address",
      },
    ],
    name: "setLandNFTAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalAssignedCoordinates",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newLandNFTAddress",
        type: "address",
      },
    ],
    name: "updateLandNFTAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080806040523461005b5760008054336001600160a01b0319821681178355916001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09080a3610f3590816100618239f35b600080fdfe608060408181526004908136101561001657600080fd5b600092833560e01c9081630650e90414610857575080630b4b8e2e146107fc5780631039f59d146108185780631ff72b06146107fc578063235e78eb146104b05780632dd8e3281461077057806337c905a9146106de5780633c7c604f14610697578063478935d3146104b55780634bf11ad2146104b057806367e7907c14610493578063715018a6146104365780637babce561461040a5780637facfc10146103cb5780638cf6408f146103a25780638da5cb5b1461037a578063af11c6f61461035c578063bfed498914610236578063e4027da6146101cc5763f2fde38b1461010057600080fd5b346101c85760203660031901126101c8576001600160a01b038235818116939192908490036101c4576101316108cf565b831561017257505082546001600160a01b0319811683178455167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08380a380f35b906020608492519162461bcd60e51b8352820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152fd5b8480fd5b8280fd5b838234610232576101e56101df366108b9565b90610aa7565b8151928392602080850191818652845180935281818701950193905b83821061020e5786860387f35b84518051875283015186840152879650948501949382019360019190910190610201565b5080fd5b5091903461023257826003193601126102325780359161026160018060a01b03600154163314610927565b61026f612710835410610d11565b6024358152602091600383526102a183868420875161028d81610973565b600182549283835201549283910152610aa7565b80511561030f578051156102fc578386910151928351815260028552818120958585019687518352865280838320558152600385522082518155600185519101556102ec81546109c7565b9055519151908351928352820152f35b634e487b7160e01b835260328252602483fd5b855162461bcd60e51b8152808301859052602160248201527f4e6f20617661696c61626c652061646a6163656e7420636f6f7264696e6174656044820152607360f81b6064820152608490fd5b5090346101c857826003193601126101c85760209250549051908152f35b838234610232578160031936011261023257905490516001600160a01b039091168152602090f35b83823461023257816003193601126102325760015490516001600160a01b039091168152602090f35b838234610232576020906104016103e1366108b9565b906000526002602052604060002090600052602052604060002054151590565b90519015158152f35b838234610232578060209261041e366108b9565b90825260028552828220908252845220549051908152f35b833461049057806003193601126104905761044f6108cf565b80546001600160a01b03198116825581906001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a380f35b80fd5b838234610232578160031936011261023257602090516127108152f35b610898565b50346101c85760603660031901126101c857813560243591604435916104e660018060a01b03600154163314610927565b61271085541015610654578584121580610649575b156106065785831215806105fb575b156105b8578386526020906002825282872084885282528287205461057557600193929160039186895260028252838920858a52825280848a205583519661055188610973565b87528187019485528852528520925183555191015561057081546109c7565b905580f35b825162461bcd60e51b8152808701839052601b60248201527f436f6f7264696e61746520616c7265616479206f6363757069656400000000006044820152606490fd5b815162461bcd60e51b8152602081870152601960248201527f7920636f6f7264696e617465206f7574206f662072616e6765000000000000006044820152606490fd5b50606383131561050a565b815162461bcd60e51b8152602081870152601960248201527f7820636f6f7264696e617465206f7574206f662072616e6765000000000000006044820152606490fd5b5060638413156104fb565b815162461bcd60e51b8152602081870152601c60248201527f416c6c20636f6f7264696e61746573206172652061737369676e6564000000006044820152606490fd5b5090346101c85760203660031901126101c857918192358152600360205220602082516106c381610973565b60018354938483520154918291015282519182526020820152f35b50346101c85760203660031901126101c8576001600160a01b038235818116939192908490036101c4576107106108cf565b60015492831661072d5750506001600160a01b0319161760015580f35b906020606492519162461bcd60e51b8352820152601b60248201527f4c616e644e4654206164647265737320616c72656164792073657400000000006044820152fd5b5090346101c85760203660031901126101c85780356001600160a01b03811692908390036107f8576107a06108cf565b82156107c35750506bffffffffffffffffffffffff60a01b600154161760015580f35b906020606492519162461bcd60e51b8352820152600f60248201526e496e76616c6964206164647265737360881b6044820152fd5b8380fd5b8382346102325781600319360112610232576020905160638152f35b509134610490576020366003190112610490575061084b9061084560018060a01b03600154163314610927565b35610d69565b82519182526020820152f35b8490346102325781600319360112610232576020918152f35b90600019820191821360011661088257565b634e487b7160e01b600052601160045260246000fd5b346108b45760003660031901126108b457602060405160648152f35b600080fd5b60409060031901126108b4576004359060243590565b6000546001600160a01b031633036108e357565b606460405162461bcd60e51b815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b1561092e57565b60405162461bcd60e51b815260206004820152601e60248201527f4f6e6c79204c616e644e465420636f6e74726163742063616e2063616c6c00006044820152606490fd5b6040810190811067ffffffffffffffff82111761098f57604052565b634e487b7160e01b600052604160045260246000fd5b90601f8019910116810190811067ffffffffffffffff82111761098f57604052565b60001981146108825760010190565b906001820191600060018412911290801582169115161761088257565b906004811015610a045760051b0190565b634e487b7160e01b600052603260045260246000fd5b67ffffffffffffffff811161098f5760051b60200190565b90610a3c82610a1a565b604090610a4b825191826109a5565b8381528093610a5c601f1991610a1a565b0191600090815b848110610a71575050505050565b6020908251610a7f81610973565b848152828581830152828701015201610a63565b8051821015610a045760209160051b010190565b906000916040805192608080850185811067ffffffffffffffff821117610cfd578352855b818110610cdd5750506063610ae0846109d6565b1315610cb4575b6000610af284610870565b1215610c82575b6063610b04826109d6565b1315610c45575b6000610b1682610870565b1215610c04575b505050610b2982610a32565b91600091825b828110610b8257505050610b4281610a32565b9160005b828110610b535750505090565b80610b61610b7d9284610a93565b51610b6c8287610a93565b52610b778186610a93565b506109c7565b610b46565b610bc0610b8f82846109f3565b51516020610b9d84866109f3565b510151906000526002602052604060002090600052602052604060002054151590565b15610bd4575b610bcf906109c7565b610b2f565b92610bfc610bcf91610be686856109f3565b51610bf18289610a93565b52610b778188610a93565b939050610bc6565b90610c14610c3c94959392610870565b905191610c2083610973565b82526020820152610c3182856109f3565b52610b7781846109f3565b90388080610b1d565b93610c7c90610c53866109d6565b835190610c5f82610973565b8582526020820152610c7182876109f3565b52610b7781866109f3565b93610b0b565b93610cae90610c9084610870565b835190610c9c82610973565b8152866020820152610c7182876109f3565b93610af9565b9350610cbf826109d6565b815190610ccb82610973565b81528460208201528352600193610ae7565b6020908451610ceb81610973565b88815288838201528188015201610acc565b634e487b7160e01b87526041600452602487fd5b15610d1857565b60405162461bcd60e51b8152602060048201526024808201527f416c6c206f776e61626c6520636f6f7264696e6174657320617265206173736960448201526319db995960e21b6064820152608490fd5b600091600491610d7d612710845410610d11565b835b606480821015610ebb5760409081516020908282820182610dba888a4442869290916080949284526020840152604083015260608201520190565b0392610dce601f19948581018352826109a5565b519020069260019182870190818811610ea857865142868201908152446020820152604081018b9052606081019390935290610e15908260808501039081018352826109a5565b5190200693610e3e85856000526002602052604060002090600052602052604060002054151590565b15610e56575050505050610e51906109c7565b610d7f565b9194509297828198969397985260028552818120898252855282828220556003825195610e8287610973565b888752808701948b8652835252209251835551910155610ea281546109c7565b90559190565b634e487b7160e01b8c5260118b5260248cfd5b60405162461bcd60e51b8152602081870152601f60248201527f4e6f20617661696c61626c652072616e646f6d20636f6f7264696e61746573006044820152606490fdfea2646970667358221220ff2e780ead8fc7c26b5ea9b5955b23612c8f8e0b028456c669351097d2de3dc964736f6c63430008130033";

type MapContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MapContractConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MapContract__factory extends ContractFactory {
  constructor(...args: MapContractConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      MapContract & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): MapContract__factory {
    return super.connect(runner) as MapContract__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MapContractInterface {
    return new Interface(_abi) as MapContractInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): MapContract {
    return new Contract(address, _abi, runner) as unknown as MapContract;
  }
}