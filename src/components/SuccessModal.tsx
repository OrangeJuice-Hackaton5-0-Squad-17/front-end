'use client'

import { useState } from 'react'
import Image from 'next/image'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import successImg from '@/assets/images/success.svg'

export function SuccessModal() {
  const [openedModal, setOpenedModal] = useState(false)

  function handleOpenSuccessModal() {
    setOpenedModal(true)
  }

  function handleCloseSuccessModal() {
    setOpenedModal(false)
  }

  return (
    <div className="text-center">
      <Button
        variant="contained"
        onClick={handleOpenSuccessModal}
        className="bg-gray mt-4 uppercase"
      >
        Confirmar
      </Button>
      <Modal
        open={openedModal}
        onClose={handleCloseSuccessModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full sm:w-96 bg-white shadow-md p-4 flex flex-col items-center justify-center">
          <Box className="w-[254px]">
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              className="text-2xl text-center text-[#515255]"
            >
              Projeto deletado com sucesso!
            </Typography>
            <Box className="flex flex-1 flex-col items-center justify-center mt-8">
              <Image src={successImg} alt="success image" width={40} priority />
              <Button
                onClick={handleCloseSuccessModal}
                className="h-[42px] w-full bg-[#ff5522] border-none text-base text-white font-bold mt-8"
                variant="outlined"
                color="primary"
              >
                Close
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default SuccessModal
