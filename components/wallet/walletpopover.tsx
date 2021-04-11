import makeBlockie from "ethereum-blockies-base64";
import { FaAngleLeft } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { IconContext } from "react-icons";
import getErrorMessage from "./errors";
import {
  getExplorerAddressLink,
  shortenAddress,
  getChainName,
  useEthers,
  useTransactions,
  shortenTransactionHash,
} from "@usedapp/core";
import Image from "next/image";
import { useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import dayjs from "dayjs";
import { ExternalLink } from "../utils/link";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "<1m ago",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  },
});

interface WalletPopoverProps {
  wallets: Wallet[];
  error: Error | undefined;
  connectedWallet: Wallet | undefined;
  connect: (c: IConnector) => void;
}

export default function WalletPopover({ wallets, connect, error, connectedWallet }: WalletPopoverProps): JSX.Element {
  const { deactivate, account, chainId } = useEthers();
  const [viewTxs, setViewTxs] = useState<boolean>();

  if (error) {
    return <div className="w-full text-center">{getErrorMessage(error)}</div>;
  }
  if (account && chainId && connectedWallet) {
    if (viewTxs) {
      return <Transactions setViewTxs={() => setViewTxs(!viewTxs)} />;
    }
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
          <ExternalLink href={getExplorerAddressLink(account, chainId)}>
            <div className="flex w-auto text-sm">
              <img className="h-6 w-6" src={makeBlockie(account)} />
              <div className="float-left ml-2 text-lg">{shortenAddress(account)}</div>
              <IconContext.Provider value={{ className: "text-xl ml-2 text-gray-800 cursor-pointer" }}>
                <HiOutlineExternalLink />
              </IconContext.Provider>
            </div>
          </ExternalLink>
        </div>
        <div className="w-full text-center pb-4 text-green-700">
          Connected to Ethereum {getChainName(chainId)} Network
        </div>
        <div
          onClick={() => setViewTxs(!viewTxs)}
          className="py-2 px-4 mb-3 border border-gray-300 rounded-md cursor-pointer text-center hover:bg-gray-200"
        >
          View Transactions
        </div>
        <div className="border-t pt-3">
          <div
            onClick={deactivate}
            className=" py-2 px-4 border border-gray-300 rounded-md cursor-pointer text-center hover:bg-gray-200"
          >
            Disconnect
          </div>
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

interface TransactionsProps {
  setViewTxs: () => void;
}

function Transactions({ setViewTxs }: TransactionsProps) {
  const { transactions } = useTransactions();
  return (
    <div className="w-full">
      <div className="flex border-b pb-2">
        <div className="w-12 float-left">
          <IconContext.Provider value={{ className: "text-2xl ml-2 cursor-pointer " }}>
            <FaAngleLeft
              onClick={() => {
                setViewTxs();
              }}
            />
          </IconContext.Provider>
        </div>
        <div className="w-full text-center pr-8">Your Transactions</div>
      </div>
      <div className="h-64 overflow-auto">
        {transactions.length > 0 ? (
          transactions.map((t, i) => (
            <div key={i} className="w-full h-8 pt-1 px-4">
              <div className="float-left">{dayjs().to(dayjs(t.transaction.timestamp))}</div>
              <div className="w-28 float-right text-center">{shortenTransactionHash(t.transaction.hash)}</div>
            </div>
          ))
        ) : (
          <div className="w-full text-center mt-4">Your transactions will show here</div>
        )}
      </div>
    </div>
  );
}
