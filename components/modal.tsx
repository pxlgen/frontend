import React, { useState, useEffect } from "react";

const colours = [
  "#000000ff",
  "#7f7f7fff",
  "#880015ff",
  "#ed1c24ff",
  "#ff7f27ff",
  "#fff200ff",
  "#22b124ff",
  "#00a2e8ff",
  "#3f48ccff",
  "#a349a4ff",
  "#ffffffff",
  "#c3c3c3ff",
  "#b97a57ff",
  "#ffaec9ff",
  "#ffc90eff",
  "#efe4b0ff",
  "#b5e61dff",
  "#99d9eaff",
  "#7092beff",
  "#c8bfe7ff",
];

interface Props {
  activeColour: string;
  setColour: React.Dispatch<React.SetStateAction<string>>;
}
export default function Palette({ activeColour, setColour }: Props): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-400 flex justify-center items-center">
      <div className="bg-white rounded-lg">
        <div className="w-96 border-t-8 border-pink-600 rounded-lg flex">
          <div className="w-1/3 pt-6 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 bg-pink-600 text-white p-3 rounded-full" fill="none" viewBox="0 0 24 24" height="24" width="24">
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M12 4.52765C9.64418 2.41689 6.02125 2.49347 3.75736 4.75736C1.41421 7.1005 1.41421 10.8995 3.75736 13.2426L10.5858 20.0711C11.3668 20.8521 12.6332 20.8521 13.4142 20.0711L20.2426 13.2426C22.5858 10.8995 22.5858 7.1005 20.2426 4.75736C17.9787 2.49347 14.3558 2.41689 12 4.52765ZM10.8284 6.17157L11.2929 6.63604C11.6834 7.02656 12.3166 7.02656 12.7071 6.63604L13.1716 6.17157C14.7337 4.60948 17.2663 4.60948 18.8284 6.17157C20.3905 7.73367 20.3905 10.2663 18.8284 11.8284L12 18.6569L5.17157 11.8284C3.60948 10.2663 3.60948 7.73367 5.17157 6.17157C6.73367 4.60948 9.26633 4.60948 10.8284 6.17157Z"
                fill="currentcolor"
              ></path>
            </svg>
          </div>
          <div className="w-full pt-9 pr-4">
            <h3 className="font-bold text-pink-700">Delete Feelings?</h3>
            <p className="py-4 text-sm text-gray-400">Are you sure you want to delete all feelings? If you delete your feelings, you will permantly loose everything.</p>
          </div>
        </div>

        <div className="p-4 flex space-x-4">
          <a href="#" className="w-1/2 px-4 py-3 text-center bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-black font-bold rounded-lg text-sm">
            Cancel
          </a>
          <a href="#" className="w-1/2 px-4 py-3 text-center text-pink-100 bg-pink-600 rounded-lg hover:bg-pink-700 hover:text-white font-bold text-sm">
            Delete Feelings
          </a>
        </div>
      </div>
    </div>
  );
}
