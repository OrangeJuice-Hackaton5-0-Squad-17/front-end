import Image from 'next/image'
import ProfilePicture from '../../../public/assets/profile-picture.png'

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
                    <Image src="#" alt="Image Icon" width={60} priority />
                    <h3>Adicione seu primeiro projeto</h3>
                    <p>Compartilhe seu talento com milhares de pessoas</p>
                </div>
            </section>
        </>
    )
}
