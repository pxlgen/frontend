import { useContractFunction } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import type { Web3Provider } from "@ethersproject/providers";
import PxlGen from "../abi/pxlgen.json";
import { ethers } from "ethers";

export function usePxlGenFunction(
  functionName: string,
  library: Web3Provider
): { send: (...args: any[]) => Promise<void> } {
  const pxlGenAddress = process.env.NEXT_PUBLIC_PXLGEN_ADDRESS;
  console.log(pxlGenAddress);
  const IPxlGen = new ethers.utils.Interface(PxlGen);
  const contract = new Contract(pxlGenAddress!, IPxlGen, library.getSigner());
  const { send } = useContractFunction(contract, functionName);
  return { send };
}
