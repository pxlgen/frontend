import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { FrameConnector } from "@web3-react/frame-connector";
import { InjectedConnector } from "@web3-react/injected-connector";

export interface CellToken {
  id: string;
  index: number;
  ipfsHash: string;
  owner: string;
}

export interface CellMetadata {
  name: string;
  description: string;
  image: string;
  external_url: string;
  properties: [];
}

export type Cell = CellToken & CellMetadata;

export type IConnector = InjectedConnector | FrameConnector | WalletConnectConnector;

export interface Wallet {
  name: string;
  connector: IConnector;
  image: { w: number; h: number; src: string };
}

export interface CanvasHistory {
  undo: { x: number; y: number; oldColour: string; newColour: string }[];
  redo: { x: number; y: number; oldColour: string; newColour: string }[];
}

export interface Tools {
  brush: number;
  bucket: number;
}
