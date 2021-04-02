import React, { useState, useEffect, useRef } from "react";
import ToolBox from "./toolbox";
import Palette from "./palette";
import { useEthers, addressEqual } from "@usedapp/core";
import { useSingleCell, useCanvasEditor } from "../../hooks";

export default function EditorWithData(): JSX.Element {
  const { account } = useEthers();
  const { cell, loading, error } = useSingleCell();
  const [ownerConnected, setOwnerConnected] = useState<boolean>(false);

  useEffect(() => {
    if (cell && cell.owner != "0x" && account) {
      setOwnerConnected(addressEqual(cell.owner, account));
    }
  }, [cell, account]);

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...</div>;
  if (cell) return <Editor ownerConnected={ownerConnected} cell={cell} />;
  return <></>;
}

interface EditorProps {
  ownerConnected: boolean;
  cell: Cell;
}

function Editor({ ownerConnected, cell }: EditorProps): JSX.Element {
  const canvas = useRef<HTMLCanvasElement>(null);
  const { actions, properties } = useCanvasEditor(canvas, cell.properties);

  function saveOnChain() {
    // canvas.current?.toBlob((x) => console.log(URL.createObjectURL(x)));
    console.log(canvas.current?.toDataURL());
  }
  return (
    <div>
      <div className="grid grid-cols-4 gap-4 m-5">
        <div className="col-span-4 lg:col-span-1 xl:col-span-1">
          <ToolBox
            activeTool={properties.tool}
            tools={properties.TOOLS}
            setTool={actions.setTool}
            undo={actions.undo}
            redo={actions.redo}
            clear={actions.clear}
            save={saveOnChain}
            ownerConnected={ownerConnected}
          />
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
