import { useState, useEffect } from "react";
import { FaPaintBrush } from "react-icons/fa";
import { FaFill } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";
import { FaRedoAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { IconContext } from "react-icons";
import Ripples from "react-ripples";
import { usePxlGenFunction } from "../../hooks";
import { useEthers, addressEqual } from "@usedapp/core";
import type { Web3Provider } from "@ethersproject/providers";
import { BigNumber } from "@ethersproject/bignumber";
import axios from "axios";
import { toast } from "react-toastify";

interface Props {
  plot: Plot;
  actions: CanvasActions;
  properties: CanvasProperties;
}

export default function ToolBox1({ plot, actions, properties }: Props): JSX.Element {
  const { account, library } = useEthers();

  const [ownerConnected, setOwnerConnected] = useState<boolean>(false);

  useEffect(() => {
    if (plot.owner.id != "0x" && account) {
      setOwnerConnected(addressEqual(plot.owner.id, account));
    }
  }, [plot.owner.id, account]);
  function isActive(tool: number) {
    return properties.tool == tool ? "text-blue-400 shadow-inner border border-blue-400 " : "text-gray-500";
  }

  return (
    <div className="bg-white border w-32 flex justify-center rounded-lg shadow-md">
      <div className="w-full">
        <ToolboxButton
          title="Brush"
          icon={<FaPaintBrush />}
          style={`rounded-lg rounded-b-none ${isActive(properties.TOOLS.brush)}`}
          action={() => actions.setTool(properties.TOOLS.brush)}
        />
        {/* <BrushSizes /> */}

        <ToolboxButton
          title="Bucket"
          icon={<FaFill />}
          style={`${isActive(properties.TOOLS.bucket)}`}
          action={() => actions.setTool(properties.TOOLS.bucket)}
        />
        <ToolboxButton title="Undo" icon={<FaUndoAlt />} style="text-gray-500" action={actions.undo} />
        <ToolboxButton title="Redo" icon={<FaRedoAlt />} style="text-gray-500" action={actions.redo} />
        <ToolboxButton title="Clear" icon={<FaTrash />} style="text-gray-500" action={actions.clear} />
        {library && plot.id && ownerConnected && (
          <SaveButton library={library} tokenId={plot.id} plot={plot} getCanvasData={actions.getCanvasData} />
        )}
        {(!library || !ownerConnected) && (
          <ToolboxButton title="Save" icon={<FaSave />} style="text-gray-500" action={actions.clear} disabled={true} />
        )}
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
          className={`flex justify-center w-full py-2 ${title == "Brush" ? "rounded-lg" : ""} ${
            title != "Save" ? "border-b" : ""
          } ${disabled ? "text-gray-200" : "hover:bg-gray-100 hover:text-blue-400 "}`}
        >
          <IconContext.Provider value={{ className: "text-xl mr-4" }}>{icon}</IconContext.Provider>
          <span className="">{title}</span>
        </button>
      </Ripples>
    </div>
  );
}

interface SaveButtonProps {
  tokenId: string;
  library: Web3Provider;
  plot: Plot;
  getCanvasData: () => { img: string; array: string[][] };
}

function SaveButton({ library, tokenId, plot, getCanvasData }: SaveButtonProps) {
  const id = BigNumber.from(tokenId);
  const { send } = usePxlGenFunction("updateTokenURI", library);

  const saveArtwork = async () => {
    const canvasData = getCanvasData();

    const newMetadata: PlotMetadata = {
      name: plot.name,
      description: plot.description,
      image: plot.image,
      external_url: plot.external_url,
      properties: { dataURL: canvasData.img, rawData: canvasData.array },
    };
    toast("Processing");
    const resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN!}/api/ipfs/`, newMetadata);
    const data = resp.data as { IpfsHash: string };
    void send(id, data.IpfsHash);
  };
  return <ToolboxButton title="Save" icon={<FaSave />} style="text-gray-500" action={saveArtwork} />;
}

// function BrushSizes() {
//   return (
//     <div className=" rounded-lg absolute transform translate-x-44 -translate-y-10  text-gray-500 bg-white">
//       <Ripples className="w-full rounded-lg rounded-b-none ">
//         <button className={`flex justify-center w-full py-2 border-b hover:bg-gray-100 hover:text-blue-400 `}>
//           <span className="">small</span>
//         </button>
//       </Ripples>
//       <Ripples className="w-full">
//         <button className={`flex justify-center w-full py-2 border-b  hover:bg-gray-100 hover:text-blue-400 `}>
//           <span className="">medium</span>
//         </button>
//       </Ripples>
//       <Ripples className="w-full rounded-lg rounded-t-none ">
//         <button className={`flex justify-center w-full py-2 hover:bg-gray-100 hover:text-blue-400 `}>
//           <span className="">large</span>
//         </button>
//       </Ripples>
//     </div>
//   );
// }
