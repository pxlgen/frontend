import dynamic from "next/dynamic";
import Link from "next/link";
const WalleButton = dynamic(
  () => {
    return import("./wallet");
  },
  { ssr: false }
);

export default function Header(): JSX.Element {
  return (
    <div className="text-gray-900 mx-auto bg-gray-100 p-2 shadow-md">
      <nav className="flex justify-between">
        <div className="mx-4 text-gray-900 mt-1 text-2xl">
          <Link href="/">
            <a>PxlGen</a>
          </Link>
        </div>
        <div className="w-full float-left m-auto pl-4 text-xl ">
          <Link href="/canvas">
            <a className="hover:text-gray-500">Canvas</a>
          </Link>
        </div>
        <div className="float-right mx-4">
          <WalleButton />
        </div>
      </nav>
    </div>
  );
}
