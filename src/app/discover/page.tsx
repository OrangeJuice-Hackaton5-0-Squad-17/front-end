'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Avatar, Box, Chip, Stack, TextField } from '@mui/material'

import { DetailsProjectModal } from '@/components/DetailsProjectModal'

import { mockUsersData } from '@/lib/constants'

export default function Discover() {
  const [openedModal, setModalOpened] = useState(false)

  const handleOpenDetailsProjectModal = () => {
    setModalOpened(true)
  }

  const handleCloseDetailsProjectModal = () => {
    setModalOpened(false)
  }
  return (
    <>
      <article className={`min-h-screen w-full`}>
        <section className="max-w-[1220px]">
          <h2 className="w-full lg:w-[744px] text-[#222244] text-3xl text-center mx-auto mb-28 mt-[112px]">
            Junte-se à comunidade de inovação, inspiração e descobertas,
            transformando experiências em conexões inesquecíveis
          </h2>
          <Box className="w-full flex flex-col items-start justify-center">
            <TextField
              className="border border-[#C4C4C4] rounded text-[#A0A1A5] mb-6 py-4 px-3 w-full md:w-[723px] h-[56px]"
              type="text"
              placeholder="Buscar tags"
            />
            <Box className="w-full lg:max-w-[1120px] flex flex-col items-center justify-center md:grid md:grid-cols-2 md:place-items-center md:ml-3 lg:grid lg:grid-cols-3 lg:place-items-start lg:justify-between gap-6 mt-10">
              {mockUsersData.map((user, index) => (
                <Box
                  onClick={handleOpenDetailsProjectModal}
                  key={index}
                  className="w-[312px] h-[290px] block"
                >
                  <Image
                    className="rounded"
                    src={user.image}
                    alt="project image"
                  />
                  <Box className="flex items-center gap-2 mt-2">
                    <Avatar
                      className="w-6 h-6"
                      alt="profile sharp image"
                      src={user.image}
                    />
                    <h3 className="text-[#66676A] text-base text-center">
                      {`${user.name} • ${user.date}`}
                    </h3>
                    <Stack direction="row" spacing={1}>
                      {user.tags.map((tag, index) => (
                        <Chip key={index} label={tag} />
                      ))}
                    </Stack>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          <DetailsProjectModal
            openedModal={openedModal}
            handleOpenDetailsProjectModal={handleOpenDetailsProjectModal}
            handleCloseDetailsProjectModal={handleCloseDetailsProjectModal}
          />
        </section>
      </article>
    </>
  )
}
