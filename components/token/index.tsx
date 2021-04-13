import { useEthers, shortenAddress, getExplorerAddressLink } from "@usedapp/core";
import { useSinglePlot } from "../../hooks";
import Image from "next/image";
import { ExternalLink, Link } from "../utils/link";
import { FaRegEdit } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useEffect, useState } from "react";

export default function Token(): JSX.Element {
  const [images, setImages] = useState<string[]>();
  const { chainId } = useEthers();
  const { plot, loading, error } = useSinglePlot();

  useEffect(() => {
    if (plot) {
      const imgs = [plot.image];
      if (plot.properties.dataURL) imgs.push(plot.properties.dataURL);
      setImages(imgs);
    }
  }, [plot]);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{error}</p>;
  if (plot && chainId) {
    return (
      <div className="grid grid-cols-2 gap-5 m-16">
        <div className="col-span-2 md:col-span-1">
          <div className="w-3/4 h-3/4 m-auto">
            <Gallery images={images} />
          </div>
        </div>
        <div className="col-span-2 md:col-span-1">
          <div className="w-3/4">
            <div className="text-2xl mb-5 font-medium border-b p-2">{plot.name}</div>
            <div className="p-2">
              <span className="font-medium">Description: </span>
              {plot.description}
            </div>
            {chainId && plot.owner.id != "0x" ? (
              <div className="p-2">
                <span className="font-medium">Owner: </span>
                <ExternalLink href={getExplorerAddressLink(plot.owner.id, chainId) ?? ""}>
                  {shortenAddress(plot.owner.id)}
                </ExternalLink>
              </div>
            ) : (
              <div className="p-2">
                <span className="font-medium">Status: </span>
                <ExternalLink href="https://opensea.io">Still Available</ExternalLink>
              </div>
            )}
            <div className="w-full flex">
              <div className="p-2">
                <Link href={`/token/editor/${plot.index}`}>
                  <div className="flex shadow-md w-28 py-2 px-4 border border-blue-300 rounded-md text-blue-500 text-center hover:bg-blue-200">
                    <IconContext.Provider value={{ className: "mt-1 mr-1 ml-2" }}>
                      <FaRegEdit />
                    </IconContext.Provider>
                    Editor
                  </div>
                </Link>
              </div>
              <div className="p-2">
                <a href="https://opensea.io/" title="Buy on OpenSea" target="_blank" rel="noreferrer">
                  <img
                    className="border border-gray-300 rounded-md w-32 shadow-md"
                    src="https://storage.googleapis.com/opensea-static/opensea-brand/buy-button-white.png"
                    alt="Buy on OpenSea badge"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}

function Gallery({ images }: { images: string[] | undefined }) {
  const [active, setActive] = useState<string>();

  useEffect(() => {
    if (images?.length) {
      setActive(images[0]);
    }
  }, [images]);

  if (!active || !images?.length) return <></>;
  return (
    <section className="mx-auto max-w-2xl">
      <div className="relative">
        <div className="w-full">
          <Image src={active} alt="Plot Image" width="350" height="350" layout="responsive" />
        </div>

        <div className="flex mt-4 pt-4 border-t border-gray-200">
          {images.map((s, i) => (
            <div key={i} className="w-28" onClick={() => setActive(s)}>
              <Image
                className="opacity-70 cursor-pointer hover:opacity-100"
                src={s}
                alt="Plot Image"
                width="350"
                height="350"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
