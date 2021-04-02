import { ChainId, useEthers } from "@usedapp/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { FrameConnector } from "@web3-react/frame-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useState } from "react";

const walletconnect = new WalletConnectConnector({
  rpc: { 4: "https://eth-rinkeby.alchemyapi.io/v2/X1Dc2c0kNbFr5yHQ_-1LE3Gk5Rp9iqgi" },
});
const injected = new InjectedConnector({ supportedChainIds: [ChainId.Mainnet, ChainId.Rinkeby, 1337] });
const frame = new FrameConnector({ supportedChainIds: [ChainId.Mainnet] });

const wallets: Wallet[] = [
  {
    name: "Metamask",
    connector: injected,
    image: {
      w: 377,
      h: 345,
      src: "/logos/metamask.png",
    },
  },
  {
    name: "Frame",
    connector: frame,
    image: {
      w: 240,
      h: 240,
      src: "/logos/frame.png",
    },
  },
  {
    name: "WalletConnect",
    connector: walletconnect,
    image: {
      w: 300,
      h: 300,
      src: "/logos/walletconnect.svg",
    },
  },
];

export function useWallet() {
  const { activate } = useEthers();
  const [error, setError] = useState<Error>();
  const [connectedWallet, setConnectedWallet] = useState<Wallet>();

  function onError(e: Error) {
    setError(e);
  }

  function connect(wallet: IConnector) {
    activate(wallet, onError);
    const w = wallets.find((w) => w.connector === wallet);
    setConnectedWallet(w);
  }

  return { wallets, connectedWallet, connect, error };
}
