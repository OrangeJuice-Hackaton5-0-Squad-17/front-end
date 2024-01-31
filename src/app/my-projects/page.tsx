import Image from 'next/image'
import { IoMdImage } from "react-icons/io"
import ProfilePicture from '../../../public/assets/profile-picture.png'
import './my-projects.css'

export default function MyProjects() {
    return (
        <>
            <section className="my-profile flex flex-col justify-center gap-6 mx-auto w-max">
                <Image className="rounded-full self-center"
                    src={ProfilePicture}
                    alt="Profile Picture"
                    width={170}
                    priority
                />

                <div className="my-profile-content">
                    <h2 className="text-[#303133] text-2xl">Camila Soares</h2>
                    <p className="text-[#939393]">Brasil</p>
                    <button className="bg-[#E0E0E0] text-[#8B8B8B] uppercase rounded py-3 px-6 tracking-wider text-sm font-bold">Adicionar Projeto</button>
                </div>
            </section>

            <section className="my-projects">
                <h2 className="text-[#6D6D6D] mt-6 mb-2 text-lg font-bold">Meus projetos</h2>
                <input className="border border-[#C4C4C4] rounded text-[#A0A1A5] mb-6 py-4 px-3 w-full" type="text" placeholder="Buscar tags" />

                <div className="add-your-first-project bg-[#E6E9F2] rounded min-h-[350px] px-6 flex flex-col justify-center">
                    <div id="generic-image-box" className="text-center mx-auto">
                        <IoMdImage id="generic-image-icon" />
                    </div>
                    <h3 className="text-[#777A7F] text-lg mb-2">Adicione seu primeiro projeto</h3>
                    <p className="text-[#777A7F] leading-[18px]">Compartilhe seu talento com milhares de pessoas</p>
                </div>
            </section>
        </>
    )
}
