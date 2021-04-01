import { useState } from "react";
import Popover from "react-popover";
import WalletButton from "./walletbutton";
import { useWallet } from "../../hooks";
import WalletPopover from "./walletpopover";

export default function Wallet() {
  const [open, setOpen] = useState<boolean>(false);
  const { wallets, connectedWallet, connect, error } = useWallet();

  return (
    <div>
      <Popover
        className="wallet mt-5 shadow-sm border border-gray-200 rounded-md"
        isOpen={open}
        body={<WalletPopover wallets={wallets} connect={connect} error={error} connectedWallet={connectedWallet} />}
        onOuterAction={() => setOpen(false)}
        preferPlace="below"
      >
        <div>
          <WalletButton togglePopover={() => setOpen(!open)} />
        </div>
      </Popover>
    </div>
  );
}
