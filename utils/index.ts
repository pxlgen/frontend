import { ChainId } from "@usedapp/core";

export function getPxlGenAddress(chain: ChainId | undefined): string {
  let address = "";
  switch (chain) {
    case ChainId.Mainnet:
      break;
    case ChainId.Rinkeby:
      break;
    case 1337:
      address = process.env.NEXT_PUBLIC_PXLGEN_ADDRESS ?? "";
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

export function getDefaultPlot(index: number): Plot {
  const { x, y } = getCoordinates(index);
  let formattedIndex = `${index}`;
  while (formattedIndex.length < 3) {
    formattedIndex = `0${formattedIndex}`;
  }
  return {
    id: "0x00",
    index: index,
    ipfsHash: `QmbJbiKnRhfZmTQU6Uh8jHPfVGJ2Uvj4Gu6QiwKJShcnGP/${index}.json`,
    name: `PxlGen Plot ${formattedIndex}`,
    description: `This Plot is ${formattedIndex} of the 400 which make up the PxlGen canvas. This Plots coordinates are (${x}, ${y})`,
    image: `${process.env.NEXT_PUBLIC_DOMAIN!}/images/${index}.png`,
    external_url: `${process.env.NEXT_PUBLIC_DOMAIN!}/token/${index}`,
    properties: { dataURL: "", rawData: [] },
    createdAt: 0,
    type: "Plot",
    owner: { id: "0x", totalOwned: 0, tokens: [] },
  };
}
