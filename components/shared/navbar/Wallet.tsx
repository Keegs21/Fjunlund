import { client } from "../../../client";
import { ConnectButton } from "thirdweb/react";

const Wallet = () => {
  return (
    <ConnectButton client={client} />
  );
};

export default Wallet;
