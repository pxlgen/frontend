export default function Header(): JSX.Element {
  return (
    <div className="text-gray-100 mx-auto bg-gray-900 p-2 shadow-lg">
      <nav className="flex justify-between">
        <div className="text-gray-100 mt-1 text-2xl">
          <a href="#">NFT Canvas</a>
        </div>
        <div className="float-right">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Connect</button>
        </div>
      </nav>
    </div>
  );
}
