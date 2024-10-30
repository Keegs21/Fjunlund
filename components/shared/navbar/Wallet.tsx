import { client } from "../../../client";
import { ConnectButton } from "thirdweb/react";
import { fantomSonicTestnet } from "@/chain";
import { createWallet } from "thirdweb/wallets";

const Wallet = () => {
  return (
    <ConnectButton
      client={client}
      chain={fantomSonicTestnet}
      wallets={[
        createWallet("io.metamask"),
        createWallet("com.coinbase.wallet"),
        createWallet("me.rainbow"),
      ]}
       />
  );
};

export default Wallet;
