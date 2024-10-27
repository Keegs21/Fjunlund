import { client } from "../../../client";
import { ConnectButton } from "thirdweb/react";
import { fantom } from "thirdweb/chains";

const Wallet = () => {
  return (
    <ConnectButton client={client} chain={fantom} />
  );
};

export default Wallet;
