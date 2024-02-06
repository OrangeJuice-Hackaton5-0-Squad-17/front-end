'use client'

import { Button, Modal, Box, Typography } from '@mui/material'
import { redirect } from 'next/navigation'
import { api } from '@/services/api'
import { useAuth } from '@/hooks/useAuth'
import { navigate } from '@/app/actions'

type ConfirmAccountDeletionModalProps = {
  openedModal: boolean
  handleCloseTheConfirmAccountDeletionModal: () => void
}

export function ConfirmAccountDeletionModal({
  openedModal,
  handleCloseTheConfirmAccountDeletionModal,
}: ConfirmAccountDeletionModalProps) {
  const { signOut, user } = useAuth()

  async function handleAccountDeletion() {
    const token = localStorage.getItem('@OrangePortfolios:token')

    const response = await api.delete(`/user/${user?.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    handleCloseTheConfirmAccountDeletionModal()

    signOut()

    navigate('/sign-in')
  }

  return (
    <div className="text-center">
      <Modal
        open={openedModal}
        onClose={handleCloseTheConfirmAccountDeletionModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:max-w-lg bg-white shadow-md px-4 py-8 md:p-8 flex flex-col items-center justify-center">
          <Box>
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              className="text-2xl text-center text-[#515255] px-2"
            >
              Tem certeza que deseja deletar a sua conta?
            </Typography>
            <Box className="flex flex-col md:flex-row gap-4 items-center justify-center mt-8">
              <Button
                onClick={handleCloseTheConfirmAccountDeletionModal}
                className="h-[42px] bg-[#E0E0E0] text-[#8B8B8B] border-none text-base font-bold uppercase mt-8 px-6 w-full"
                variant="outlined"
                color="primary"
              >
                Cancelar
              </Button>

              <Button
                onClick={handleAccountDeletion}
                className="h-[42px] bg-[#ff5522] border-none text-base text-white font-bold uppercase md:mt-8 px-6 w-full"
                variant="outlined"
                color="primary"
              >
                Deletar Conta
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default ConfirmAccountDeletionModal
