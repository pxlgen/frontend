import React, { useRef } from "react";
import ToolBox from "./toolbox";
import Palette from "./palette";
import { FaAngleLeft } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useSinglePlot, useCanvasEditor } from "../../hooks";
import Link from "next/link";

export default function EditorWithData(): JSX.Element {
  const { plot, loading, error } = useSinglePlot();

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...</div>;
  if (plot) return <Editor plot={plot} />;
  return <></>;
}

interface EditorProps {
  plot: Plot;
}

function Editor({ plot }: EditorProps): JSX.Element {
  const canvas = useRef<HTMLCanvasElement>(null);
  const { actions, properties } = useCanvasEditor(canvas, plot.properties);

  return (
    <div className="bg-gray-200 w-screen h-screen">
      <div className="grid grid-cols-4 gap-4 p-5 ">
        <div className="col-span-4 lg:col-span-1 xl:col-span-1">
          <Link href={`/token/${plot.index}`}>
            <a>
              <button className="flex justify-center w-32 py-2 mb-4 border text-gray-500 bg-white border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100">
                <IconContext.Provider value={{ className: "text-2xl mr-2   cursor-pointer " }}>
                  <FaAngleLeft />
                </IconContext.Provider>
                <span>Exit</span>
              </button>
            </a>
          </Link>

          <ToolBox plot={plot} actions={actions} properties={properties} />
        </div>
        <div className="col-span-4 lg:col-span-2 xl:col-span-2">
          <canvas
            onClick={actions.draw}
            onMouseDown={() => setTimeout(() => actions.setGlide(true), 100)}
            onMouseUp={() => setTimeout(() => actions.setGlide(false), 100)}
            onMouseMove={actions.glide}
            ref={canvas}
            className="mx-auto crisp-rendering cursor-crosshair shadow-md"
            width={properties.CANVAS_SIZE}
            height={properties.CANVAS_SIZE}
          ></canvas>
        </div>

        <div className="col-span-4 lg:col-span-1 xl:col-span-1">
          <Palette activeColour={properties.colour} setColour={actions.setColour} />
        </div>
      </div>
    </div>
  );
}
