import { useState, useEffect, useRef } from "react";
import ToolBox from "./toolbox";
import Palette from "./palette";
import { Tools } from "../interfaces";
import useLocalStorage from "../hooks/useLocalStorage";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const tools: Tools = {
  brush: 0,
  bucket: 1,
  undo: 2,
  redo: 3,
  clear: 4,
};

const CANVAS_SIZE = 500; // 500 x 500
const PIXELS = 50; // 50 x 50 grid
const PIXEL_SIZE = 10; // PIXELS * PIXEL_SIZE = CANVAS_SIZE
let blankCanvas = [...Array(PIXELS)].map((e) => Array(PIXELS).fill("#ffffffff"));
let data = [];
let history = { undo: [], redo: [] };

export default function Editor(): JSX.Element {
  const [colour, setColour] = useState<string>("#000000ff");
  const [tool, setTool] = useState<number>(tools.brush);
  const [glideActive, setGlide] = useState<boolean>(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setCtx(canvas.current.getContext("2d"));
  }, []);

  // once context is loaded we can redraw the canvas
  useEffect(() => {
    const item = localStorage.getItem("canvas-data");
    data = item ? JSON.parse(item) : blankCanvas;
    redraw();
  }, [ctx]);

  function draw(e: React.MouseEvent<HTMLElement>) {
    if (tool == tools.brush) brush(e);
    if (tool == tools.bucket) bucket(e);
  }

  function redraw() {
    if (data) {
      for (let i = 0; i < PIXELS; i++) {
        for (let j = 0; j < PIXELS; j++) {
          fill(i, j, data[i][j]);
        }
      }
    }

    // let img = new Image();
    // img.setAttribute("src", canvasData);
    // img.addEventListener("load", function () {
    //   ctx.drawImage(img, 0, 0);
    // });
  }

  function glide(e) {
    if (glideActive) {
      brush(e);
    }
  }

  function brush(e: React.MouseEvent<HTMLElement>) {
    const { x, y } = coordinates(e);
    if (data[x][y] != colour) {
      history.undo.push({ x, y, oldColour: data[x][y], newColour: colour });
      fill(x, y);
      save();
    }
  }

  function undo() {
    const lastItem = history.undo.pop();
    if (typeof lastItem !== "undefined") {
      history.redo.push(lastItem);
      fill(lastItem.x, lastItem.y, lastItem.oldColour);
    }
  }
  function redo() {
    const lastItem = history.redo.pop();
    if (typeof lastItem !== "undefined") {
      fill(lastItem.x, lastItem.y, lastItem.newColour);
    }
  }
  function clear() {
    data = blankCanvas;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    setColour("#000000ff");
    save();
  }

  function bucket(e: React.MouseEvent<HTMLElement>) {
    const { x, y } = coordinates(e);
    let checked = {};
    const filler = (x: number, y: number, target: string) => {
      if (withinBounds(x, y) && !checked[`${x},${y}`]) {
        checked[`${x},${y}`] = true;
        // if cell is colour of target and not colour of fill colour then fill
        if (data[x][y] == target && data[x][y] != colour) {
          history.undo.push({ x, y, oldColour: data[x][y], newColour: colour });
          fill(x, y);
          filler(x + 1, y, target);
          filler(x, y + 1, target);
          filler(x - 1, y, target);
          filler(x, y - 1, target);
        }
      }
    };
    filler(x, y, data[x][y]);
    save();
  }

  function fill(x: number, y: number, colourOveride?: string) {
    if (withinBounds(x, y) && ctx != undefined) {
      ctx.fillStyle = colourOveride ? colourOveride : colour;
      data[x][y] = colourOveride ? colourOveride : colour;
      ctx.fillRect(Math.floor(x * PIXEL_SIZE), Math.floor(y * PIXEL_SIZE), PIXEL_SIZE, PIXEL_SIZE);
    }
  }

  function coordinates(e) {
    var canvasInfo = canvas.current.getBoundingClientRect(); // canvas stats
    // coordinates on the 550 x 550 grid
    var x = e.clientX - canvasInfo.left;
    var y = e.clientY - canvasInfo.top;
    // translate the coordinates to 50 x 50 grid
    x = Math.floor((PIXELS * x) / canvas.current.clientWidth);
    y = Math.floor((PIXELS * y) / canvas.current.clientHeight);
    return { x, y };
  }

  function withinBounds(x, y) {
    return x >= 0 && x < PIXELS && y >= 0 && y < PIXELS;
  }

  function save() {
    localStorage.setItem("canvas-data", JSON.stringify(data));
  }

  return (
    <div>
      <div className="grid grid-cols-6 gap-4 m-5">
        <div className="col-span-6 lg:col-span-1 xl:col-span-1">
          <ToolBox activeTool={tool} tools={tools} setTool={setTool} undo={undo} redo={redo} clear={clear} />
        </div>

        <div className="col-span-6 lg:col-span-4 xl:col-span-4">
          <canvas
            onClick={draw}
            onMouseDown={() => setTimeout(() => setGlide(true), 100)}
            onMouseUp={() => setTimeout(() => setGlide(false), 100)}
            onMouseMove={glide}
            ref={canvas}
            className="mx-auto crisp-rendering cursor-crosshair"
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
          ></canvas>
        </div>

        <div className="col-span-6 lg:col-span-1 xl:col-span-1">
          <Palette activeColour={colour} setColour={setColour} />
        </div>
      </div>
    </div>
  );
}
