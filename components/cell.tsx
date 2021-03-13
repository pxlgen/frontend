import { useRef, useState, useEffect } from "react";
import Popover from "react-popover";

const CANVAS_SIZE = 1000;
const PIXELS = 50; // 50 x 50 grid
let data = [];
let blankCanvas = [...Array(PIXELS)].map((e) => Array(PIXELS).fill("#ffffffff"));

export default function Cell() {
  const [open, setOpen] = useState<boolean>(false);
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number }>();
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    setCtx(canvas.current.getContext("2d"));
  }, []);

  // once context is loaded we can redraw the canvas
  useEffect(() => {
    if (ctx) {
      const item = localStorage.getItem("canvas-data");
      data = item ? JSON.parse(item) : blankCanvas;
      redraw();
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

  const mouseDownCoords = (e) => {
    setClickPosition({ x: e.pageX, y: e.pageY });
  };
  const clickOrDrag = (e) => {
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
      <Popover isOpen={open} body={<PopoverContent />} onOuterAction={() => setOpen(false)}>
        <div
          onMouseDown={mouseDownCoords}
          onMouseUp={clickOrDrag}
          className={`float-left ${open ? "transform scale-150" : ""}`}
          style={{ height: 50, width: 50 }}
        >
          <canvas
            ref={canvas}
            className={`crisp-rendering ${open ? "border-black border" : ""}`}
            width={50}
            height={50}
          ></canvas>
        </div>
      </Popover>
    </div>
  );
}

const PopoverContent = () => {
  return (
    <div className="bg-gray-200 text-black">
      <p>This is a default Popover </p>
      <p>Content</p>
      <p>
        <a href="https://google.com">link</a>
      </p>
    </div>
  );
};
