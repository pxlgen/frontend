import { useState, useEffect, useRef } from "react";
import ToolBox from "../components/toolbox";
import Palette from "../components/palette";
import { Tools } from "../interfaces";
import useLocalStorage from "../hooks/useLocalStorage";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const tools: Tools = {
  brush: 0,
  bucket: 1,
  undo: 2,
  redo: 3,
  clear: 4,
};

const CANVAS_SIZE = 50; // 500 x 500
// const PIXELS = 50; // 50 x 50 grid
// const PIXEL_SIZE = 10; // PIXELS * PIXEL_SIZE = CANVAS_SIZE
let blankCanvas = [...Array(CANVAS_SIZE)].map((e) => Array(CANVAS_SIZE).fill("#ffffffff"));
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
      for (let i = 0; i < CANVAS_SIZE; i++) {
        for (let j = 0; j < CANVAS_SIZE; j++) {
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
      ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
    }
  }

  function coordinates(e) {
    var canvasInfo = canvas.current.getBoundingClientRect(); // canvas stats
    // coordinates on the 550 x 550 grid
    // var x = e.clientX - canvasInfo.left;
    // var y = e.clientY - canvasInfo.top;
    console.log(canvas.current.clientWidth);
    var x = Math.floor((e.clientX - canvasInfo.left) / 12);
    var y = Math.floor((e.clientY - canvasInfo.top) / 12);
    console.log(x / 10);
    console.log(y / 10);

    // translate the coordinates to 50 x 50 grid
    // x = Math.floor((2 * x) / canvas.current.clientWidth);
    // y = Math.floor((2 * y) / canvas.current.clientHeight);
    console.log(x, y);

    return { x, y };
  }

  function withinBounds(x, y) {
    return x >= 0 && x < CANVAS_SIZE && y >= 0 && y < CANVAS_SIZE;
  }

  function save() {
    localStorage.setItem("canvas-data", JSON.stringify(data));
  }

  return (
    <div>
      <div className="text-gray-100 mx-auto bg-gray-900 p-2 shadow-lg">
        <nav className="flex justify-between">
          <div className="text-gray-100 mt-1 text-2xl">
            <a href="#">NFT Canvas</a>
          </div>
          <div className="float-right">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Connect</button>
          </div>
        </nav>
      </div>
      <div className="grid grid-cols-6 gap-4 m-5">
        <div className="col-span-6 lg:col-span-1 xl:col-span-1">
          <ToolBox activeTool={tool} tools={tools} setTool={setTool} undo={undo} redo={redo} clear={clear} />
        </div>

        <div className="col-span-6 lg:col-span-4 xl:col-span-4">
          <div className="mx-auto" id="canvas_cont" style={{ height: 500, width: 500 }}>
            <canvas
              onClick={draw}
              onMouseDown={() => setTimeout(() => setGlide(true), 100)}
              onMouseUp={() => setTimeout(() => setGlide(false), 100)}
              onMouseMove={glide}
              ref={canvas}
              className="mx-auto"
              id="canvas"
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
            ></canvas>
          </div>
        </div>

        <div className="col-span-6 lg:col-span-1 xl:col-span-1">
          <Palette activeColour={colour} setColour={setColour} />
        </div>
      </div>
    </div>
  );
}
