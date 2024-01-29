import Image from 'next/image'
import Link from 'next/link'

import OrangeLogo from '../../../public/assets/orange-logo.png'
import ProfilePicture from '../../../public/assets/profile-picture.png'
import BellIcon from '../../../public/assets/bell-icon.png'

export function Header() {
  return (
    <header className="bg-[#111133] py-4 px-8 text-white flex gap-24 items-center">
      <Image src={OrangeLogo} alt="Orange Logo" width={110} priority />

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
          src={ProfilePicture}
          alt="Profile Picture"
          width={40}
          priority
        />
        <Image src={BellIcon} alt="Bell Icon" width={15} priority />
      </div>
    </header>
  )
}
