'use client'

// import { notFound } from 'next/navigation'

import Image from 'next/image'
import { useState } from 'react'

import ProjectImageMock from '@/assets/images/project-image-mock.webp'
import ProfilePicture from '@/assets/images/default-profile-picture.svg'

export default function ProjectDetails({
  params,
}: {
  params: {
    projectId: string
  }
}) {
  const [projectId, setProjectId] = useState(params.projectId)

  return (
    <>
      <h2 className="text-[#222244] text-center text-2xl mx-auto mb-6">
        Ecommerce One Page
      </h2>

      <article className="project flex flex-col justify-center gap-4">
        <Image className="rounded" src={ProjectImageMock} alt="Project Image" />

        <div className="project-info flex items-center gap-2">
          <Image
            className="rounded-full"
            src={ProfilePicture}
            alt="Author's Profile Picture"
            width={30}
          />

          <h3 className="text-[#66676A]">Bianca Martin • 02/24</h3>

          <ul className="project-tags flex items-center gap-3 ml-auto">
            <li className="bg-[#EAEAEA] rounded-full py-2 px-3">UX</li>
            <li className="bg-[#EAEAEA] rounded-full py-2 px-3">Web</li>
          </ul>
        </div>
      </article>

      <p className="project-description mt-4 mb-8 text-[#505050] leading-4">
        Temos o prazer de compartilhar com vocês uma variação da nosso primeiro
        recurso gratuito, Monoceros. um modelo de uma página para mostrar seus
        produtos. Tentamos redesenhar uma versão mais B2C e minimalista do nosso
        primeiro template de e-commerce.
      </p>

      <div className="flex flex-col">
        <p className="text-lg font-bold">Download</p>
        <a
          className="text-[#6E88C1] -mt-2"
          href="#"
          target="_blank"
          rel="external"
        >
          https://gumroad.com/products/wxCSL
        </a>
      </div>
    </>
  )
}
