import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { FrameConnector } from "@web3-react/frame-connector";
import { InjectedConnector } from "@web3-react/injected-connector";

declare global {
  ///////////////////////////
  //// Plot Types
  ///////////////////////////
  export interface PlotToken {
    id: string;
    index: number;
    ipfsHash: string;
    owner: Owner;
    createdAt: number;
    type: string;
  }

  export interface PlotMetadata {
    name: string;
    description: string;
    image: string;
    external_url: string;
    properties: { dataURL: string; rawData: string[][] };
  }

  export type Plot = PlotToken & PlotMetadata;

  export interface Owner {
    id: string;
    totalOwned: number;
    tokens: [];
  }

  ///////////////////////////
  //// Wallet Types
  ///////////////////////////

  export type IConnector = InjectedConnector | FrameConnector | WalletConnectConnector;

  export interface Wallet {
    name: string;
    connector: IConnector;
    image: { w: number; h: number; src: string };
  }

  ///////////////////////////
  //// Canvas Types
  ///////////////////////////

  export interface CanvasHistory {
    undo: { x: number; y: number; oldColour: string; newColour: string }[];
    redo: { x: number; y: number; oldColour: string; newColour: string }[];
  }

  export interface Tools {
    brush: number;
    bucket: number;
  }

  interface CanvasActions {
    draw: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    undo: () => void;
    redo: () => void;
    clear: () => void;
    setColour: React.Dispatch<React.SetStateAction<string>>;
    glide: (e: React.MouseEvent) => void;
    setGlide: React.Dispatch<React.SetStateAction<boolean>>;
    setTool: React.Dispatch<React.SetStateAction<number>>;
    getCanvasData: () => { img: string; array: string[][] };
  }

  interface CanvasProperties {
    CANVAS_SIZE: number;
    TOOLS: Tools;
    tool: number;
    colour: string;
  }
}

export {};
