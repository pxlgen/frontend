import React, { useState, useEffect, MouseEvent } from "react";
import { FaPaintBrush } from "react-icons/fa";
import { FaFill } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";
import { FaRedoAlt } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { IconContext, IconType } from "react-icons";
import Ripples from "react-ripples";

interface Props {
  activeTool: number;
  tools: Tools;
  ownerConnected: boolean;
  undo: () => void;
  redo: () => void;
  clear: () => void;
  save: () => void;
  setTool: React.Dispatch<React.SetStateAction<number>>;
}
export default function ToolBox1({
  activeTool,
  tools,
  undo,
  redo,
  clear,
  save,
  setTool,
  ownerConnected,
}: Props): JSX.Element {
  function isActive(tool: number) {
    return activeTool == tool ? "text-blue-400 shadow-inner border border-blue-400 " : "text-gray-500";
  }

  return (
    <div>
      <div className="border w-1/2 flex justify-center rounded-lg shadow-md">
        <div className=" w-full">
          <ToolboxButton
            title="Brush"
            icon={<FaPaintBrush />}
            style={`rounded-lg rounded-b-none ${isActive(tools.brush)}`}
            action={() => setTool(tools.brush)}
          />
          <ToolboxButton
            title="Bucket"
            icon={<FaFill />}
            style={`${isActive(tools.bucket)}`}
            action={() => setTool(tools.bucket)}
          />
          <ToolboxButton title="Undo" icon={<FaUndoAlt />} style="text-gray-500" action={undo} />
          <ToolboxButton title="Redo" icon={<FaRedoAlt />} style="text-gray-500" action={redo} />
          <ToolboxButton title="Clear" icon={<FaTrash />} style="text-gray-500" action={clear} />
          <ToolboxButton
            title="Save"
            icon={<FaSave />}
            style="text-gray-500"
            action={save}
            disabled={!ownerConnected}
          />
        </div>
      </div>
    </div>
  );
}

interface ToolboxButtonProps {
  title: string;
  style: string;
  disabled?: boolean;
  icon: JSX.Element;
  action: () => void;
}

function ToolboxButton({ title, style, icon, disabled, action }: ToolboxButtonProps) {
  return (
    <div className={`${style}`}>
      <Ripples className="w-full">
        <button
          disabled={disabled}
          onClick={action}
          className={`flex justify-center w-full py-2 ${title != "Save" ? "border-b" : ""} ${
            disabled ? "text-gray-200" : "hover:bg-gray-100 hover:text-blue-400 "
          }`}
        >
          <IconContext.Provider value={{ className: "text-xl mr-4" }}>{icon}</IconContext.Provider>
          <span className="">{title}</span>
        </button>
      </Ripples>
    </div>
  );
}

// function ToolboxButton2({ title, active, icon, action }: ToolboxButtonProps) {
//   return (
//     <button
//       onClick={action}
//       className={`flex w-28 h-8 m-2 float-left border rounded-md cursor-pointer hover:bg-gray-200 ${active()}`}
//     >
//       <div className="m-auto ">
//         <IconContext.Provider value={{ className: "text-xl float-left mr-2" }}>{icon}</IconContext.Provider>
//         {title}
//       </div>
//     </button>
//   );
// }

// function ToolBox2({ activeTool, tools, undo, redo, clear, setTool }: Props): JSX.Element {
//   function isActive(tool: number) {
//     return activeTool == tool ? "bg-gray-400 text-gray-900" : "text-gray-500";
//   }

//   return (
//     <div className="lg:w-28 lg:float-left cursor-pointer">
//       <span
//         onClick={() => setTool(tools.brush)}
//         className={`box-border h-14 w-14 border border-r-0 border-gray-300 float-left pt-2 ${isActive(tools.brush)}`}
//       >
//         <IconContext.Provider value={{ className: "text-4xl  mx-auto align-middle" }}>
//           <BiEditAlt />
//         </IconContext.Provider>
//       </span>
//       <span
//         onClick={() => setTool(tools.bucket)}
//         className={`box-border h-14 w-14 border border-r-0 lg:border-r border-gray-300 float-left pt-2 ${isActive(
//           tools.bucket
//         )}`}
//       >
//         <IconContext.Provider value={{ className: "text-4xl mx-auto align-middle" }}>
//           <RiPaintFill />
//         </IconContext.Provider>
//       </span>
//       <span
//         onClick={undo}
//         className={`box-border h-14 w-14 border border-r-0  lg:border-t-0 border-gray-300 float-left pt-3 ${isActive(
//           tools.undo
//         )}`}
//       >
//         <IconContext.Provider value={{ className: "text-3xl mx-auto align-middle" }}>
//           <FaUndoAlt />
//         </IconContext.Provider>
//       </span>
//       <Ripples>
//         <span
//           onClick={redo}
//           className={` box-border h-14 w-14 border lg:border-t-0 border-gray-300 float-left pt-3 ${isActive(
//             tools.redo
//           )}`}
//         >
//           <IconContext.Provider value={{ className: "text-3xl mx-auto align-middle" }}>
//             <FaRedoAlt />
//           </IconContext.Provider>
//         </span>
//       </Ripples>

//       <span
//         onClick={clear}
//         className={`box-border h-14 w-14 border border-r-0  lg:border-t-0 border-gray-300 float-left pt-3 ${isActive(
//           tools.undo
//         )}`}
//       >
//         <IconContext.Provider value={{ className: "text-3xl mx-auto align-middle" }}>
//           <FaTrash />
//         </IconContext.Provider>
//       </span>
//       <span
//         className={`box-border h-14 w-14 border lg:border-t-0 border-gray-300 float-left pt-3 ${isActive(tools.redo)}`}
//       >
//         <IconContext.Provider value={{ className: "text-3xl mx-auto align-middle" }}>
//           <FaSave />
//         </IconContext.Provider>
//       </span>
//     </div>
//   );
// }
