import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch/dist";
import Cell from "./cell";

// let coords = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"];
let coords = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
];

export default function Canvas(): JSX.Element {
  var rows = [];
  for (var i = 0; i < 400; i++) {
    rows.push(<Cell key={i} />);
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
              <div className="grid-container">
                <div className="grid grid-flow-col x-coords text-gray-400">
                  {coords.map((x) => (
                    <span className="m-auto">{x}</span>
                  ))}
                </div>
                <div className="float-left grid grid-flow-row y-coords text-gray-400">
                  {coords.map((x) => (
                    <span className="m-auto">{x}</span>
                  ))}
                </div>

                <div className="float-left canvas-container">{rows}</div>
              </div>
            </TransformComponent>
          </div>
        )}
      </TransformWrapper>
    </div>
  );
}
