import { MouseEvent, ReactNode } from "react";
import { FaSearchPlus } from "react-icons/fa";
import { FaSearchMinus } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { IconContext } from "react-icons";

interface CanvasControlsProps {
  zoomIn: (e: MouseEvent) => void;
  zoomOut: (e: MouseEvent) => void;
  resetTransform: (e: MouseEvent) => void;
}

export default function CanvasControls({ zoomIn, zoomOut, resetTransform }: CanvasControlsProps): JSX.Element {
  return (
    <div className="flex pl-5 shadow-md text-gray-700 font-light bg-gray-200">
      <ControlButton action={(e) => zoomIn(e)}>
        <IconContext.Provider value={{ className: "mt-1 mr-1 float-left" }}>
          <FaSearchPlus />
        </IconContext.Provider>
        <span>Zoom In</span>
      </ControlButton>
      <ControlButton action={(e) => zoomOut(e)}>
        <IconContext.Provider value={{ className: "mt-1 mr-1 float-left" }}>
          <FaSearchMinus />
        </IconContext.Provider>
        <span>Zoom Out</span>
      </ControlButton>
      <ControlButton action={(e) => resetTransform(e)}>
        <IconContext.Provider value={{ className: "mt-1 mr-1 float-left" }}>
          <FaRedo />
        </IconContext.Provider>
        <span>Reset</span>
      </ControlButton>
    </div>
  );
}

interface ControlButtonProps {
  action: (e: MouseEvent) => void;
  children: ReactNode;
}

function ControlButton({ action, children }: ControlButtonProps) {
  return (
    <div
      onClick={(e) => action(e)}
      className="w-22 my-2 py-1 px-2 border-r border-gray-300 cursor-pointer hover:text-gray-400"
    >
      {children}
    </div>
  );
}
