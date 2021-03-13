import React, { useState, useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiPaintFill } from "react-icons/ri";
import { FaUndoAlt } from "react-icons/fa";
import { FaRedoAlt } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Tools } from "../interfaces";

interface Props {
  activeTool: number;
  tools: Tools;
  undo: () => void;
  redo: () => void;
  clear: () => void;
  setTool: React.Dispatch<React.SetStateAction<number>>;
}
export default function ToolBox({ activeTool, tools, undo, redo, clear, setTool }: Props): JSX.Element {
  function isActive(tool: number) {
    return activeTool == tool ? "bg-blue-500 text-gray-900" : "text-gray-300";
  }
  return (
    <div className="lg:w-28 lg:float-left cursor-pointer">
      <span onClick={() => setTool(tools.brush)} className={`box-border h-14 w-14 border-2 border-r-0 border-gray-300 float-left pt-2 ${isActive(tools.brush)}`}>
        <IconContext.Provider value={{ className: "text-4xl mx-auto align-middle" }}>
          <BiEditAlt />
        </IconContext.Provider>
      </span>
      <span onClick={() => setTool(tools.bucket)} className={`box-border h-14 w-14 border-2 border-r-0 lg:border-r-2 border-gray-300 float-left pt-2 ${isActive(tools.bucket)}`}>
        <IconContext.Provider value={{ className: "text-4xl mx-auto align-middle" }}>
          <RiPaintFill />
        </IconContext.Provider>
      </span>
      <span onClick={undo} className={`box-border h-14 w-14 border-2 border-r-0  lg:border-t-0 border-gray-300 float-left pt-3 ${isActive(tools.undo)}`}>
        <IconContext.Provider value={{ className: "text-3xl mx-auto align-middle" }}>
          <FaUndoAlt />
        </IconContext.Provider>
      </span>
      <span onClick={redo} className={`box-border h-14 w-14 border-2 lg:border-t-0 border-gray-300 float-left pt-3 ${isActive(tools.redo)}`}>
        <IconContext.Provider value={{ className: "text-3xl mx-auto align-middle" }}>
          <FaRedoAlt />
        </IconContext.Provider>
      </span>
      <span onClick={clear} className={`box-border h-14 w-14 border-2 border-r-0  lg:border-t-0 border-gray-300 float-left pt-3 ${isActive(tools.undo)}`}>
        <IconContext.Provider value={{ className: "text-3xl mx-auto align-middle" }}>
          <FaTrash />
        </IconContext.Provider>
      </span>
      <span className={`box-border h-14 w-14 border-2 lg:border-t-0 border-gray-300 float-left pt-3 ${isActive(tools.redo)}`}>
        <IconContext.Provider value={{ className: "text-3xl mx-auto align-middle" }}>
          <FaSave />
        </IconContext.Provider>
      </span>
    </div>
  );
}
