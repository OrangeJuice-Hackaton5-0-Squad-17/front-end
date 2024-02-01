'use client'

import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { FaTrashAlt } from 'react-icons/fa'

export function DeleteProjectModal() {
  const [openedModal, setOpenedModal] = useState(false)

  function handleOpenDeleteProjectModal() {
    setOpenedModal(true)
  }

  function handleCloseDeleteProjectModal() {
    setOpenedModal(false)
  }

  return (
    <div className="min-h-screen">
      <Button variant="outlined" onClick={handleOpenDeleteProjectModal}>
        <FaTrashAlt />
      </Button>
      <Dialog open={openedModal} onClose={handleCloseDeleteProjectModal}>
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
            onClick={handleCloseDeleteProjectModal}
          >
            Excluir
          </Button>
          <Button
            className="h-[42px] w-[124px] bg-[#dddee0] hover:bg-[#d3d3d3] text-[#818388] text-base font-semibold uppercase"
            onClick={handleCloseDeleteProjectModal}
            autoFocus
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
