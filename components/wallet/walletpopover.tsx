import makeBlockie from "ethereum-blockies-base64";
import { MdContentCopy } from "react-icons/md";
import { HiOutlineExternalLink } from "react-icons/hi";
import { IconContext } from "react-icons";
import { IConnector, Wallet } from "../../types";
import getErrorMessage from "./errors";
import { getExplorerAddressLink, shortenAddress, getChainName, useEthers } from "@usedapp/core";
import Image from "next/image";

interface WalletPopoverProps {
  wallets: Wallet[];
  error: Error | undefined;
  connectedWallet: Wallet | undefined;
  connect: (c: IConnector) => void;
}

export default function WalletPopover({ wallets, connect, error, connectedWallet }: WalletPopoverProps) {
  const { deactivate, account, chainId } = useEthers();

  if (error) {
    return <div className="w-full text-center">{getErrorMessage(error)}</div>;
  }
  if (account && chainId && connectedWallet) {
    return (
      <div className="w-full">
        <div className="w-full p-2 mb-2">
          <div className="flex w-30 float-left pr-14">
            <div className="float-right w-8 h-8 align-middle">
              <Image
                src={connectedWallet.image.src}
                alt={connectedWallet.name}
                width={connectedWallet.image.w}
                height={connectedWallet.image.h}
                layout="responsive"
              />
            </div>
            <div className="w-full text-center">{connectedWallet.name}</div>
          </div>
          <div className="flex w-auto text-sm">
            <img className="h-6 w-6" src={makeBlockie(account)} />
            <div className="float-right ml-2">{shortenAddress(account)}</div>
            <IconContext.Provider value={{ className: "text-xl ml-2 cursor-pointer" }}>
              <MdContentCopy onClick={() => navigator.clipboard.writeText(account)} />
            </IconContext.Provider>
            <IconContext.Provider value={{ className: "text-xl ml-2 cursor-pointer" }}>
              <HiOutlineExternalLink onClick={() => window.open(getExplorerAddressLink(account, chainId), "_blank")} />
            </IconContext.Provider>
          </div>
        </div>
        <div className="w-full text-center pb-4 text-green-700">
          Connected to Ethereum {getChainName(chainId)} Network
        </div>
        <div
          onClick={deactivate}
          className=" py-2 px-4 border border-gray-300 rounded-md cursor-pointer text-center hover:bg-gray-200"
        >
          Disconnect
        </div>
      </div>
    );
  }
  return <WalletList connect={connect} wallets={wallets} />;
}

interface WalletListProps {
  wallets: Wallet[];
  connect: (c: IConnector) => void;
}

function WalletList({ wallets, connect }: WalletListProps) {
  return (
    <div className="w-full">
      {wallets.map((w) => (
        <div
          key={w.name}
          onClick={() => connect(w.connector)}
          className="flex rounded-md m-3 shadow-sm hover:bg-gray-100 border border-gray-200 cursor-pointer"
        >
          <div className="w-full p-4">{w.name}</div>
          <div className="float-right w-10 h-10 py-3 mr-4 align-middle">
            <Image src={w.image.src} alt={w.name} width={w.image.w} height={w.image.h} layout="responsive" />
          </div>
        </div>
      ))}
    </div>
  );
}
