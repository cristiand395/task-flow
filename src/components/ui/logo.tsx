import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href='/'>
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={30}
          height={30}
        />
        <p className="text-lg text-neutral-700 pb-1">
          Task Flow
        </p>
      </div>
    </Link>
  );
}