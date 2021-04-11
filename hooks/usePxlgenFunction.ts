import { useContractFunction } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import type { Web3Provider } from "@ethersproject/providers";
import PxlGen from "../abi/pxlgen.json";
import { ethers } from "ethers";
import { useEthers } from "@usedapp/core";
import { getPxlGenAddress } from "../utils";

export function usePxlGenFunction(
  functionName: string,
  library: Web3Provider
): { send: (...args: any[]) => Promise<void> } {
  const { chainId } = useEthers();
  const pxlGenAddress = getPxlGenAddress(chainId);
  const IPxlGen = new ethers.utils.Interface(PxlGen);
  const contract = new Contract(pxlGenAddress, IPxlGen, library.getSigner());
  const { send } = useContractFunction(contract, functionName);
  return { send };
}
