import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#111133] py-4 px-8 text-white flex gap-24 items-center">
      <Image
        src="/assets/img/orange-logo.png"
        alt="Orange Logo"
        width={110}
        height={40}
      />

      <nav className="">
        <ul className="flex gap-6 list-none">
          <li>
            <Link href="/meus-projetos">Meus projetos</Link>
          </li>
          <li>
            <Link href="/descobrir">Descobrir</Link>
          </li>
        </ul>
      </nav>

      <div className="flex items-center gap-4 ml-auto">
        <Image
          className="rounded-full"
          src="/assets/img/profile-picture.png"
          alt="Profile Picture"
          width={40}
          height={40}
        />
        <Image
          src="/assets/img/bell-icon.png"
          alt="Bell Icon"
          width={15}
          height={15}
        />
      </div>
    </header>
  );
}
