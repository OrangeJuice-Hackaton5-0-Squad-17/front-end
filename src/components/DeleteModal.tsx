'use client'

import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { FaTrashAlt } from 'react-icons/fa'

export function DeleteModal() {
  const [openedModal, setOpenedModal] = useState(false)

  function handleOpenDeleteModal() {
    setOpenedModal(true)
  }

  function handleCloseDeleteModal() {
    setOpenedModal(false)
  }

  return (
    <div className="min-h-screen">
      <Button variant="outlined" onClick={handleOpenDeleteModal}>
        <FaTrashAlt />
      </Button>
      <Dialog open={openedModal} onClose={handleCloseDeleteModal}>
        <DialogTitle className="text-2xl text-[#515255]">
          Deseja Excluir?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>
              <h1 className="text-base text-[#515255]">
                Se você prosseguir irá excluir o projeto do {'\n'}seu portfólio
              </h1>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className="h-[42px] w-[106px] bg-[#ff5522] hover:bg-[#cc4400] text-white text-base font-semibold uppercase"
            onClick={handleCloseDeleteModal}
          >
            Excluir
          </Button>
          <Button
            className="h-[42px] w-[124px] bg-[#dddee0] hover:bg-[#d3d3d3] text-[#818388] text-base font-semibold uppercase"
            onClick={handleCloseDeleteModal}
            autoFocus
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
