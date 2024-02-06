'use client'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface DeleteProjectModal {
  openedModal: boolean
  handleCloseDeleteProjectModal: () => void
}

export function DeleteProjectModal({
  openedModal,
  handleCloseDeleteProjectModal,
}: DeleteProjectModal) {
  const theme = useTheme()

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={openedModal}
        onClose={handleCloseDeleteProjectModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle className="text-2xl text-[#515255]">
          Deseja Excluir?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h1 className="text-base text-[#515255]">
              Se você prosseguir irá excluir o projeto do {'\n'}seu portfólio
            </h1>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            className="h-[42px] w-[106px] bg-[#ff5522] hover:bg-[#cc4400] text-white text-base font-semibold uppercase"
            onClick={handleCloseDeleteProjectModal}
          >
            Excluir
          </Button>
          <Button
            autoFocus
            className="h-[42px] w-[124px] bg-[#dddee0] hover:bg-[#d3d3d3] text-[#818388] text-base font-semibold uppercase"
            onClick={handleCloseDeleteProjectModal}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
