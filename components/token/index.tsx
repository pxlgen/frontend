import Layout from "../layout";
import { useEthers, shortenAddress, getExplorerAddressLink } from "@usedapp/core";
import { useSingleCell } from "../../hooks";
import Image from "next/image";
import Link from "next/link";

export default function Token(): JSX.Element {
  const { chainId } = useEthers();
  const { cell, loading, error } = useSingleCell();

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{error}</p>;
  if (cell && chainId) {
    return (
      <div className="grid grid-cols-2 gap-5 m-16">
        <div className="col-span-2 md:col-span-1">
          <div className="w-3/4 h-3/4 m-auto">
            <Image src={cell.image} alt="Cell Image" width="350" height="350" layout="responsive" />
          </div>
        </div>
        <div className="col-span-2 md:col-span-1">
          <div className="text-2xl mb-5 font-medium">{cell.name}</div>
          <div>{cell.description}</div>
          <div>
            <Link href={`/token/editor/${cell.index}`}>
              <a>Edit</a>
            </Link>
          </div>
          <div>
            <span>Owner: </span>
            {cell.owner != "0x" && (
              <a className="text-blue-400 hover:underline" href={`${getExplorerAddressLink(cell.owner, chainId)}`}>
                {shortenAddress(cell?.owner)}
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}
