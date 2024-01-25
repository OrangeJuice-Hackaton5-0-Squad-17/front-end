import Image from 'next/image'
import { IoMdImage } from "react-icons/io"
import ProfilePicture from '../../../public/assets/profile-picture.png'
import "my-projects.css"

export default function MyProjects() {
    return (
        <>
            <section className="my-profile">
                <Image
                    src={ProfilePicture}
                    alt="Profile Picture"
                    width={150}
                    priority
                />
                <h2>Camila Soares</h2>
                <p>Brasil</p>
                <button>Adicionar Projeto</button>
            </section>

            <section className="my-projects">
                <h2>Meus projetos</h2>
                <input type="text" placeholder="Buscar tags" />
                <div className="add-your-first-project">
                    <div id="generic-image-box">
                        <IoMdImage id="generic-image-icon" />
                    </div>
                    <h3>Adicione seu primeiro projeto</h3>
                    <p>Compartilhe seu talento com milhares de pessoas</p>
                </div>
            </section>
        </>
    )
}
