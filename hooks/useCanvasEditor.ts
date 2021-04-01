import { useState, useEffect, RefObject } from "react";
import { Tools } from "../types";
import { CanvasHistory } from "../types";

const CANVAS_SIZE = 500; // 500 x 500
const PIXELS = 50; // 50 x 50 grid
const PIXEL_SIZE = 10; // PIXELS * PIXEL_SIZE = CANVAS_SIZE
const BLANK_CANVAS: string[][] = [...Array(PIXELS)].map((e) => Array(PIXELS).fill("#ffffffff"));

const TOOLS: Tools = {
  brush: 0,
  bucket: 1,
};

export function useCanvasEditor(canvas: RefObject<HTMLCanvasElement>, properties: []) {
  const [colour, setColour] = useState<string>("#000000ff");
  const [canvasData, setCanvasData] = useState<string[][]>(BLANK_CANVAS);
  const [history, setHistory] = useState<CanvasHistory>({ undo: [], redo: [] });
  const [tool, setTool] = useState<number>(TOOLS.brush);
  const [glideActive, setGlide] = useState<boolean>(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

  useEffect(() => {
    if (canvas.current) setCtx(canvas.current.getContext("2d") as CanvasRenderingContext2D);
  }, [canvas]);

  useEffect(() => {
    // const item = localStorage.getItem("canvas-data");
    if (properties.length) setCanvasData(properties);
    redraw();
  }, [ctx]);

  function draw(e: React.MouseEvent<HTMLElement>) {
    if (tool == TOOLS.brush) brush(e);
    if (tool == TOOLS.bucket) bucket(e);
  }

  function redraw() {
    if (canvasData) {
      for (let i = 0; i < PIXELS; i++) {
        for (let j = 0; j < PIXELS; j++) {
          fill(i, j, canvasData[i][j]);
        }
      }
    }

    // let img = new Image();
    // img.setAttribute("src", canvasData);
    // img.addEventListener("load", function () {
    //   ctx.drawImage(img, 0, 0);
    // });
  }

  function glide(e: React.MouseEvent) {
    if (glideActive) {
      brush(e);
    }
  }

  function brush(e: React.MouseEvent) {
    const { x, y } = coordinates(e);
    if (canvasData[x][y] != colour) {
      let h = history;
      h.undo.push({ x, y, oldColour: canvasData[x][y], newColour: colour });
      setHistory(h);
      fill(x, y);
      saveLocal();
    }
  }

  function undo() {
    let h = history;
    const lastItem = h.undo.pop();
    if (lastItem) {
      h.redo.push(lastItem);
      fill(lastItem.x, lastItem.y, lastItem.oldColour);
    }
    setHistory(h);
  }
  function redo() {
    let h = history;
    const lastItem = h.redo.pop();
    setHistory(h);
    if (typeof lastItem !== "undefined") {
      fill(lastItem.x, lastItem.y, lastItem.newColour);
    }
  }
  function clear() {
    if (ctx != undefined) {
      setCanvasData(BLANK_CANVAS);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      setColour("#000000ff");
      saveLocal();
    }
  }

  function bucket(e: React.MouseEvent<HTMLElement>) {
    const { x, y } = coordinates(e);
    let checked: { [key: string]: boolean } = {};
    const filler = (x: number, y: number, target: string) => {
      if (withinBounds(x, y) && !checked[`${x},${y}`]) {
        checked[`${x},${y}`] = true;
        // if cell is colour of target and not colour of fill colour then fill
        if (canvasData[x][y] == target && canvasData[x][y] != colour) {
          let h = history;
          h.undo.push({ x, y, oldColour: canvasData[x][y], newColour: colour });
          setHistory(h);
          fill(x, y);
          filler(x + 1, y, target);
          filler(x, y + 1, target);
          filler(x - 1, y, target);
          filler(x, y - 1, target);
        }
      }
    };
    filler(x, y, canvasData[x][y]);
    saveLocal();
  }

  function fill(x: number, y: number, colourOveride?: string) {
    if (withinBounds(x, y) && ctx != undefined) {
      ctx.fillStyle = colourOveride ? colourOveride : colour;
      saveCanvasData(x, y, colourOveride ? colourOveride : colour);
      ctx.fillRect(Math.floor(x * PIXEL_SIZE), Math.floor(y * PIXEL_SIZE), PIXEL_SIZE, PIXEL_SIZE);
    }
  }

  function coordinates(e: React.MouseEvent) {
    var canvasInfo = canvas.current!.getBoundingClientRect(); // canvas stats
    // coordinates on the 550 x 550 grid
    var x = e.clientX - canvasInfo.left;
    var y = e.clientY - canvasInfo.top;
    if (x >= 500) x = 499; // hack to avoid getting x coord of 50
    // translate the coordinates to 50 x 50 grid
    x = Math.floor((PIXELS * x) / canvas.current!.clientWidth);
    y = Math.floor((PIXELS * y) / canvas.current!.clientHeight);

    return { x, y };
  }

  function withinBounds(x: number, y: number) {
    return x >= 0 && x < PIXELS && y >= 0 && y < PIXELS;
  }

  function saveLocal() {
    localStorage.setItem("canvas-data", JSON.stringify(canvasData));
  }

  function saveCanvasData(x: number, y: number, colour: string) {
    let c = canvasData;
    c[x][y] = colour;
    setCanvasData(c);
  }

  return {
    actions: { draw, undo, redo, clear, setColour, glide, setGlide, setTool },
    properties: { tool, CANVAS_SIZE, colour, TOOLS },
  };
}
