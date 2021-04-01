import { useContractCall, ChainId } from "@usedapp/core";
import PxlGen from "../abi/pxlgen.json";
import { getPxlGenAddress } from "../utils";
import { ethers } from "ethers";

export function useBaseURI(chainId: ChainId | undefined): string {
  const pxlGenAddress = getPxlGenAddress(chainId ?? 1337);
  const IPxlGen = new ethers.utils.Interface(PxlGen);
  const [baseURI] =
    useContractCall({
      abi: IPxlGen,
      address: pxlGenAddress,
      method: "baseURI",
      args: [],
    }) ?? [];
  return baseURI;
}
