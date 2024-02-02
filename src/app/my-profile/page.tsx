import Image from 'next/image'

import ProfilePicture from '@/assets/images/default-profile-picture.svg'

import EditIcon from '@mui/icons-material/Edit'

export default function MyProfile() {
  return (
    <section className="flex flex-col gap-2 relative w-full">
      <button className="absolute right-0 top-0 rounded-full flex items-center justify-center p-1.5 hover:bg-[#FF5522] hover:text-white transition-all">
        <EditIcon className="text-xl" />
      </button>

      <Image
        className="rounded-full mx-auto"
        src={ProfilePicture}
        alt="User Profile Picture"
        width={170}
        priority
      />

      <h2 className="text-[#303133] text-2xl">Camila Soares</h2>
      <p className="text-[#939393]">Brasil</p>
      <button className="bg-[#E0E0E0] text-[#8B8B8B] uppercase rounded py-3 px-6 tracking-wider text-sm font-bold">
        Adicionar Projeto
      </button>

      <button className="bg-[#E0E0E0] text-[#8B8B8B] uppercase rounded py-3 px-6 tracking-wider text-sm font-bold">
        Deletar Conta
      </button>
    </section>
  )
}
