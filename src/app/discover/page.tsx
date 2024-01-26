import Image from 'next/image'
import ProjectImageMock from '@/assets/images/project-image-mock.webp'
import ProfilePicture from '../../../public/assets/profile-picture.png'

export default function Discover() {
    return (
        <>
            <h2 className="text-[#222244] text-center mx-auto mb-8">Junte-se à comunidade de inovação, inspiração e descobertas, transformando experiências em conexões inesquecíveis</h2>

            <section className="discover">
                <input className="border border-[#C4C4C4] rounded text-[#A0A1A5] mb-6 py-4 px-3 w-full" type="text" placeholder="Buscar tags" />

                <section className="projects flex flex-col justify-center gap-6">
                    <article className="project flex flex-col justify-center gap-4">
                        <Image className="rounded" src={ProjectImageMock} alt="Project Image" />

                        <div className="project-info flex items-center gap-2">
                            <Image className="rounded-full" src={ProfilePicture} alt="Author's Profile Picture" width={30} />

                            <h3 className="text-[#66676A]">Bianca Martin • 02/24</h3>

                            <ul className="project-tags flex items-center gap-3 ml-auto">
                                <li className="bg-[#EAEAEA] rounded-full py-2 px-3">UX</li>
                                <li className="bg-[#EAEAEA] rounded-full py-2 px-3">Web</li>
                            </ul>
                        </div>
                    </article>


                </section>
            </section>
        </>
    )
}