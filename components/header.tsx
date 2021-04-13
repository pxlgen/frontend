import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

const WalleButton = dynamic(
  () => {
    return import("./wallet");
  },
  { ssr: false }
);

export default function Header(): JSX.Element {
  return (
    <div className="text-gray-900 mx-auto bg-gray-100 border-b p-1 border-gray-300 h-14">
      <nav className="flex justify-between mt-0.5">
        <div className="mx-4 text-gray-900 text-2xl">
          <Link href="/">
            <a>
              <div className="w-52 pt-1">
                <Image src="/logos/header_logo.png" alt="Plot Image" width="700" height="122" />
              </div>
            </a>
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
