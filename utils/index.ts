import { ChainId } from "@usedapp/core";
import { Cell } from "../types";

export function getPxlGenAddress(chain: ChainId): string {
  let address = "";
  switch (chain) {
    case ChainId.Mainnet:
      break;
    case ChainId.Rinkeby:
      break;
    case 1337:
      address = process.env.NEXT_PUBLIC_PXLGEN_ADDRESS ?? "";
    default:
      break;
  }
  return address;
}

export function getCoordinates(index: number): { x: number; y: number } {
  const lower = Math.floor(index / 20) * 20;
  const upper = Math.ceil(index / 20) * 20;
  let x = index - lower;
  const y = upper / 20;
  if (x == 0) x = 20; // index: 400
  return { x, y };
}

export function getDefaultCell(index: number): Cell {
  const { x, y } = getCoordinates(index);
  let formattedIndex: string = `${index}`;
  while (formattedIndex.length < 3) {
    formattedIndex = `0${formattedIndex}`;
  }
  return {
    id: "0x00",
    index: index,
    ipfsHash: `QmbJbiKnRhfZmTQU6Uh8jHPfVGJ2Uvj4Gu6QiwKJShcnGP/${index}.json`,
    owner: "0x",
    name: `PxlGen Cell ${formattedIndex}`,
    description: `This Cell is ${formattedIndex} of the 400 which make up the PxlGen canvas. This Cells coordinates are (${x}, ${y})`,
    image: `http://localhost:3000/images/${index}.png`,
    external_url: `http://localhost:3000/token/${index}`,
    properties: [],
  };
}
