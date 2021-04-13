import { useEthers } from "@usedapp/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { FrameConnector } from "@web3-react/frame-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";

let alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_RINKEBY_API_KEY ?? "";
let activeChain = parseInt(process.env.NEXT_PUBLIC_ACTIVE_CHAINID ?? "1");

const walletconnect = new WalletConnectConnector({
  rpc: { 4: alchemyKey },
});
const injected = new InjectedConnector({ supportedChainIds: [activeChain] });
const frame = new FrameConnector({ supportedChainIds: [activeChain] });

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

export function useWallet(): {
  wallets: Wallet[];
  connectedWallet: Wallet | undefined;
  connect: (wallet: IConnector) => void;
  error: Error | undefined;
} {
  const { activate, chainId } = useEthers();
  const [error, setError] = useState<Error>();
  const [connectedWallet, setConnectedWallet] = useState<Wallet>();

  useEffect(() => {
    setError(undefined);
  }, [chainId]);

  function onError(e: Error) {
    setError(e);
  }

  useEffect(() => {
    void injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        connect(injected);
      }
    });
  }, []);

  function connect(wallet: IConnector) {
    void activate(wallet, onError);
    const w = wallets.find((w) => w.connector === wallet);
    setConnectedWallet(w);
  }

  return { wallets, connectedWallet, connect, error };
}
