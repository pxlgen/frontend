import { useRef, useState, useEffect } from "react";
import Popover from "react-popover";
import { Link } from "../utils/link";
import { Cell } from "../../types";
import { getCoordinates } from "../../utils";
import { ExternalLink } from "../utils/link";
import { getExplorerAddressLink, shortenAddress, useEthers } from "@usedapp/core";

const CANVAS_SIZE = 1000;
const PIXELS = 50; // 50 x 50 grid
let data: string[][] = [];
let blankCanvas: string[][] = [...Array(PIXELS)].map((e) => Array(PIXELS).fill("#ffffffff"));

interface CellProps {
  index: number;
  cell: Cell;
}

export default function CanvasCell({ index, cell }: CellProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let ctx: CanvasRenderingContext2D;
    ctx = canvas.current!.getContext("2d") as CanvasRenderingContext2D;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    setCtx(ctx);
  }, []);

  // once context is loaded we can redraw the canvas
  useEffect(() => {
    async function canvasData() {
      if (cell) {
        data = cell.properties.length > 0 ? cell.properties : blankCanvas;
        redraw();
      }
    }
    if (ctx) {
      canvasData();
    }
  }, [ctx]);

  function redraw() {
    if (data) {
      for (let i = 0; i < PIXELS; i++) {
        for (let j = 0; j < PIXELS; j++) {
          fill(i, j, data[i][j]);
        }
      }
    }
  }

  function fill(x: number, y: number, colourOveride?: string) {
    if (ctx != undefined) {
      ctx.fillStyle = colourOveride ? colourOveride : "white";
      data[x][y] = colourOveride ? colourOveride : "white";
      ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
    }
  }

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
      <Popover isOpen={open} body={<PopoverContent cell={cell} />} onOuterAction={() => setOpen(false)}>
        <div
          onMouseDown={mouseDownCoords}
          onMouseUp={clickOrDrag}
          className={`float-left ${open ? "transform scale-150" : ""}`}
          style={{ height: 50, width: 50 }}
        >
          <canvas
            ref={canvas}
            className={`crisp-rendering ${open ? "border-gray-400 border" : ""}`}
            width={50}
            height={50}
          ></canvas>
        </div>
      </Popover>
    </div>
  );
}

interface PopoverContentProps {
  cell: Cell;
}

const PopoverContent = ({ cell }: PopoverContentProps) => {
  const { chainId } = useEthers();
  const { x, y } = getCoordinates(cell.index);
  if (chainId) console.log(getExplorerAddressLink(cell.owner, chainId));

  return (
    <div className="w-60 p-2 bg-gray-100 text-black border border-gray-400 rounded-md">
      <div className="font-semibold border-b p-2">{cell.name}</div>
      <div className="p-2">
        <span className="font-medium">Coordinates: </span>📍 ({x}, {y})
      </div>
      {chainId && cell.owner != "0x" ? (
        <div className="p-2">
          <span className="font-medium">Owner: </span>
          <ExternalLink href={getExplorerAddressLink(cell.owner, chainId)}>{shortenAddress(cell.owner)}</ExternalLink>
        </div>
      ) : (
        <div className="p-2">
          <span className="font-medium">Status: </span>
          <ExternalLink href="https://opensea.io">Still Available</ExternalLink>
        </div>
      )}
      <div className="w-full text-center mt-4">
        <Link href={`/token/${cell.index}`}>View Cell</Link>
      </div>
    </div>
  );
};
