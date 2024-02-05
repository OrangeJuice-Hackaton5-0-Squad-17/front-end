'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Box, Button, TextField, Typography } from '@mui/material'

import { useWindowSize } from '@/hooks/useWindowsSize'

import { CreateProjectModal } from '@/components/CreateProjectModal'

import profileImg from '@/assets/images/default-profile-picture.svg'
import dropzoneIcon from '@/assets/images/dropzone-icon.svg'

export default function MyProjects() {
  const [openedModal, setOpenedModal] = useState(false)

  const size = useWindowSize()

  function handleOpenCreateProjectModal() {
    setOpenedModal(!openedModal)
  }

  function handleCloseCreateProjectModal() {
    setOpenedModal(!openedModal)
  }

  return (
    <>
      <section
        className={`w-full flex flex-col items-center justify-center gap-6 mx-auto ${size.width <= 375 ? 'px-3' : 'px-8'}`}
        data-aos="fade-up"
      >
        <Box className="w-[340px] h-[122px] flex flex-col items-center justify-center md:flex md:flex-row gap-8 mt-28 mb-10">
          <Image
            className="rounded-full self-center"
            src={profileImg}
            alt="Profile Picture"
            width={122}
            priority
          />
          <Box className="md:w-full text-center">
            <Box className="flex flex-col items-start">
              <h2 className="text-[#303133] text-2xl mb-2">Camila Soares</h2>
              <Typography className="text-[#939393] text-base mb-4">
                Brasil
              </Typography>
            </Box>
            <Button
              onClick={handleOpenCreateProjectModal}
              className="bg-[#E0E0E0] hover:bg-[#ebeaea] text-[#8B8B8B] uppercase rounded py-3 px-6 tracking-wider text-sm font-bold"
              sx={{
                marginLeft: '-12px',
                '&.fieldset': { marginLeft: '-12px' },
              }}
            >
              Adicionar Projeto
            </Button>
          </Box>
        </Box>
        <Box className="w-full flex flex-col items-start justify-center">
          <h2 className="text-[#6D6D6D] mt-12 mb-4 text-xl font-bold">
            Meus projetos
          </h2>
          <TextField
            className="border border-[#C4C4C4] rounded text-[#A0A1A5] mb-6 py-4 px-3 w-full md:w-[723px] h-14"
            variant="outlined"
            placeholder="Buscar tags"
            sx={{
              margin: '-12px',
              '&.fieldset': { margin: '-12px' },
            }}
          />
        </Box>
        <Box className="w-full md:grid md:grid-cols-3 md:place-items-center md:gap-4">
          <Box
            onClick={handleOpenCreateProjectModal}
            className="bg-[#E6E9F2] rounded min-h-[350px] px-6 flex flex-col items-center justify-center"
          >
            <Image src={dropzoneIcon} alt="dropzone icon" />
            <Box className="p-4">
              <h3 className="text-[#777A7F] text-lg mt-4 mb-2">
                Adicione seu primeiro projeto
              </h3>
              <Typography className="text-[#777A7F] leading-[18px]">
                Compartilhe seu talento com milhares de pessoas
              </Typography>
            </Box>
          </Box>
          <Box className="hidden md:block md:w-full bg-[#f8f8ff] rounded min-h-[350px]" />
          <Box className="hidden md:block md:w-full bg-[#f8f8ff] rounded min-h-[350px]" />
        </Box>
        {openedModal ? (
          <CreateProjectModal
            handleCloseCreateProjectModal={handleCloseCreateProjectModal}
            openedModal={openedModal}
          />
        ) : (
          <></>
        )}
      </section>
    </>
  )
}
