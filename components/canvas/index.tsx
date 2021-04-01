import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch/dist";
import Cell from "./cell";
import { useEffect, useState } from "react";
import { useAllCells } from "../../hooks";
import Controls from "./controls";
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
  const { cells, loading, error } = useAllCells();
  const [cellComponents, setCellComponents] = useState<JSX.Element[]>();

  useEffect(() => {
    if (cells) {
      setCellComponents(cells.map((c, i) => <Cell key={i} index={c.index} cell={c} />));
    }
    document.body.style.overflow = "hidden";
  }, [cells]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
          // @ts-ignore
          zoomIn,
          // @ts-ignore
          zoomOut,
          // @ts-ignore
          resetTransform,
        }) => (
          <div>
            <Controls zoomIn={(e) => zoomIn(e)} zoomOut={(e) => zoomOut(e)} resetTransform={(e) => resetTransform(e)} />
            <TransformComponent>
              <div className="grid-container">
                <div className="grid grid-flow-col x-coords text-gray-400">
                  {coords.map((x) => (
                    <span key={x} style={{ width: 50 }} className="m-auto text-center">
                      {x}
                    </span>
                  ))}
                </div>
                <div className="float-left grid grid-flow-row y-coords text-gray-400">
                  {coords.map((x) => (
                    <span key={x} style={{ height: 50, paddingTop: 13 }} className="m-auto">
                      {x}
                    </span>
                  ))}
                </div>

                <div className="float-left canvas-container">{cellComponents}</div>
              </div>
            </TransformComponent>
          </div>
        )}
      </TransformWrapper>
    </div>
  );
}
