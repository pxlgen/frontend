import { useRef, useState, useEffect } from "react";

import { TransformWrapper, TransformComponent } from "../lib/react-zoom-pan-pinch/dist";

const CANVAS_SIZE = 1000;
const PIXELS = 50; // 50 x 50 grid
let blankCanvas = [...Array(PIXELS)].map((e) => Array(PIXELS).fill("#ffffffff"));
let data = [];
export default function Canvas(): JSX.Element {
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
      console.log(data);
      // all();
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

    // let img = new Image();
    // img.setAttribute("src", canvasData);
    // img.addEventListener("load", function () {
    //   ctx.drawImage(img, 0, 0);
    // });
  }
  function redraw2() {
    if (data) {
      for (let i = 0; i < PIXELS; i++) {
        for (let j = 0; j < PIXELS; j++) {
          fill2(i, j, data[i][j]);
        }
      }
    }

    // let img = new Image();
    // img.setAttribute("src", canvasData);
    // img.addEventListener("load", function () {
    //   ctx.drawImage(img, 0, 0);
    // });
  }
  function fill(x: number, y: number, colourOveride?: string) {
    if (ctx != undefined) {
      ctx.fillStyle = colourOveride ? colourOveride : "white";
      data[x][y] = colourOveride ? colourOveride : "white";
      ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
    }
  }

  // function all() {

  //   for (let o of Offset) {
  //     for (let i = 0; i < PIXELS; i++) {
  //       for (let j = 0; j < PIXELS; j++) {
  //         if (ctx != undefined) {
  //           ctx.fillStyle = data[i][j] ? data[i][j] : "white";
  //           data[i][j] = data[i][j] ? data[i][j] : "white";
  //           let x = i + o.x;
  //           let y = j + o.y;
  //           ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
  //         }
  //       }
  //     }
  //   }
  //   canvas.current.toBlob(function (blob) {
  //     var url = URL.createObjectURL(blob);
  //     var link = document.createElement("a");
  //     link.download = "canvas.png";
  //     link.href = url;
  //     link.click();
  //   });
  // }

  function fill2(x: number, y: number, colourOveride?: string) {
    if (ctx != undefined) {
      ctx.fillStyle = colourOveride ? colourOveride : "white";
      data[x][y] = colourOveride ? colourOveride : "white";
      /*
        Option 1
        Token ID: x,y Offset
        1: 0,0
        2: 50,0
        3: 100,0
        4: 150,0
        ...
        20: 950,0
        21: 0,50
        22: 50,50
        23: 100,50
        24: 150,50
        ...
        30: 950,50
        31: 0,100
        32: 50,100
        33: 100,100

        Option 2
        Token ID: x,y Offset
        1: 0,0
        2: 50,0
        3: 100,0
        4: 150,0
        ...
        20: 950,0
        21: 950,50
        22: 950,100
        23: 950,150
        24: 950,200
        ...
        30: 950,950
        31: 900,950
        32: 850,950
        33: 800,950
        ...
        40: 0,950
        41: 0,900
        42: 0,850
        43: 0,800
      
      */
      const offsetx = 50;
      const offsety = 0;
      ctx.fillRect(Math.floor(x + offsetx), Math.floor(y + offsety), 1, 1);
    }
  }

  return (
    <div className="h-auto w-auto bg-gray-200">
      <TransformWrapper
        defaultScale={1}
        scale={1}
        wheel={{ step: 40 }}
        options={{ limitToBounds: false, minScale: 0.5 }}
        doubleClick={{ disabled: false }}
      >
        {({
          zoomIn,
          zoomOut,
          resetTransform,
          setDefaultState,
          positionX,
          positionY,
          scale,
          previousScale,
          options: { limitToBounds, transformEnabled, disabled },
          ...rest
        }) => (
          <div>
            <div className="flex shadow-xl">
              <div
                onClick={zoomIn}
                className="bg-gray-300 p-2 ml-3  mt-1 mb-1 shadow-inner rounded-lg hover:bg-gray-500 cursor-pointer"
              >
                Zoom In
              </div>
              <div
                onClick={zoomOut}
                className="bg-gray-300 p-2 ml-3  mt-1 mb-1 shadow-inner rounded-lg hover:bg-gray-500 cursor-pointer"
              >
                Zoom Out
              </div>
              <div
                onClick={resetTransform}
                className="bg-gray-300 p-2 ml-3 mt-1 mb-1 shadow-inner rounded-lg hover:bg-gray-500 cursor-pointer"
              >
                Reset
              </div>
            </div>
            <TransformComponent>
              <canvas
                ref={canvas}
                className="shadow-2xl"
                id="large_canvas"
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
              ></canvas>
            </TransformComponent>
          </div>
        )}
      </TransformWrapper>
    </div>
  );
}
