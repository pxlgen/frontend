import { useRef, useState, useEffect } from "react";
import Popover from "react-popover";
import { Link } from "../utils/link";
import { getCoordinates } from "../../utils";
import { ExternalLink } from "../utils/link";
import { getExplorerAddressLink, shortenAddress, useEthers } from "@usedapp/core";

const CANVAS_SIZE = 500;

interface PlotProps {
  plot: Plot;
}

export default function CanvasPlot({ plot }: PlotProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvas.current) setCtx(canvas.current.getContext("2d") as CanvasRenderingContext2D);
  }, []);

  useEffect(() => {
    if (ctx) {
      if (plot.properties.dataURL) {
        const uimg = new Image();
        uimg.src = plot.properties.dataURL;
        uimg.onload = () => {
          ctx.drawImage(uimg, 0, 0);
        };
      } else {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      }
    }
  }, [ctx, plot.properties.dataURL]);

  const mouseDownCoords = (e: React.MouseEvent): void => {
    setClickPosition({ x: e.pageX, y: e.pageY });
  };
  const clickOrDrag = (e: React.MouseEvent): void => {
    // if mouse moves > 6 pixels (i.e drag) do nothing
    if (
      e.pageX < clickPosition.x + 6 &&
      e.pageX > clickPosition.x - 6 &&
      e.pageY < clickPosition.y + 6 &&
      e.pageY > clickPosition.y - 6
    ) {
      setOpen(open ? false : true);
    }
  };

  return (
    <div id="pop">
      <Popover isOpen={open} body={<PopoverContent plot={plot} />} onOuterAction={() => setOpen(false)}>
        <div
          onMouseDown={mouseDownCoords}
          onMouseUp={clickOrDrag}
          className={`float-left ${open ? "transform scale-150" : ""}`}
          style={{ height: 50, width: 50 }}
        >
          <canvas
            ref={canvas}
            className={`crisp-rendering ${open ? "border-gray-400 border" : ""}`}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            style={{ height: 50, width: 50 }}
          ></canvas>
        </div>
      </Popover>
    </div>
  );
}

interface PopoverContentProps {
  plot: Plot;
}

const PopoverContent = ({ plot }: PopoverContentProps) => {
  const { chainId } = useEthers();
  const { x, y } = getCoordinates(plot.index);
  if (chainId) console.log(getExplorerAddressLink(plot.owner.id, chainId));

  return (
    <div className="w-60 p-2 bg-gray-100 text-black border border-gray-400 rounded-md">
      <div className="font-semibold border-b p-2">{plot.name}</div>
      <div className="p-2">
        <span className="font-medium">Coordinates: </span>📍 ({x}, {y})
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
      <div className="w-full text-center mt-4">
        <Link href={`/token/${plot.index}`}>View Plot</Link>
      </div>
    </div>
  );
};
