export function Dropdown(): JSX.Element {
  return (
    <div className="w-full">
      <span>size</span>

      <div className=" mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-20">
        <a href="#" className="block px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-200">
          small <span className="text-gray-600">(640x426)</span>
        </a>
        <a href="#" className="block px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-200">
          medium <span className="text-gray-600">(1920x1280)</span>
        </a>
        <a href="#" className="block px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-200">
          large <span className="text-gray-600">(2400x1600)</span>
        </a>
      </div>
    </div>
  );
}
