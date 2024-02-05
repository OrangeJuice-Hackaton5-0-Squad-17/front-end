'use client'

import { useState } from 'react'
import {
  Modal,
  Box,
  Typography,
  Button,
  Chip,
  Stack,
  Avatar,
} from '@mui/material'
import { RiPencilFill } from 'react-icons/ri'
import { IoCloseSharp } from 'react-icons/io5'
import Image from 'next/image'

import descriptionImg from '@/assets/images/background-details-modal.svg'

export function DetailsProjectModal() {
  const [modalOpened, setModalOpened] = useState(false)

  const handleOpenDetailsProjectModal = () => {
    setModalOpened(true)
  }

  const handleCloseDetailsProjectModal = () => {
    setModalOpened(false)
  }

  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleOpenDetailsProjectModal}
        className="w-14 h-14 mt-4 aspect-square rounded-full bg-[#ffcc99] hover:bg-[#fac086] shrink-0 grow-0"
      >
        <RiPencilFill size={18} color="#303133" />
      </Button>
      <Modal
        open={modalOpened}
        onClose={handleCloseDetailsProjectModal}
        aria-labelledby="responsive-details-modal-title"
        aria-describedby="responsive-details-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-[1042px] h-[890px] bg-white shadow-md p-4">
          <Box className="w-[838px] h-full flex flex-1 flex-col items-center justify-center mx-auto">
            <Box className="w-full flex flex-1 items-center justify-around mb-9 mt-10">
              <Box className="flex items-center">
                <Avatar
                  className="w-[40px] h-[40px]"
                  alt="profile sharp image"
                  src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                />
                <Box className="flex flex-col justify-center ml-2">
                  <Typography className="text-base text-[#303133] font-bold">
                    Camila Soares
                  </Typography>
                  <Typography className="text-base text-[#515255]">
                    12 / 12
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="h6"
                id="responsive-details-modal-title"
                className="text-2xl text-center text-[#303133]"
              >
                Ecommerce One Page
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip label="UX" />
                <Chip label="Web" />
              </Stack>
            </Box>
            <Box className="mb-16">
              <Image
                src={descriptionImg}
                alt="Details"
                className="w-full h-[525px] object-cover rounded mb-16"
              />
              <Typography
                variant="body2"
                color="textSecondary"
                className="text-base text-start text-[#303133] leading-4"
              >
                Temos o prazer de compartilhar com vocês uma variação da nosso
                primeiro recurso gratuito, Monoceros. É um modelo de uma página
                para mostrar seus produtos. Tentamos redesenhar uma versão mais
                B2C e minimalista do nosso primeiro template de e-commerce.
                <br />
                <br />
                <br />
                <b>Download</b>
                <br />
                <a
                  className="cursor-pointer text-blue-400"
                  href="https://gumroad.com/products/wxCSL"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://gumroad.com/products/wxCSL
                </a>
              </Typography>
            </Box>
          </Box>
          <Box
            onClick={handleCloseDetailsProjectModal}
            className="absolute top-0 right-0 p-4 cursor-pointer"
          >
            <IoCloseSharp size={24} color="#303133" />
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}
