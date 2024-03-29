'use client'

import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Modal, Box, Typography, TextField } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { useAuth } from '@/hooks/useAuth'

interface EditProfileDataProps {
  name: string
  email: string
  password: string
}

const editProfileSchema = z.object({
  name: z.string().min(3),
  email: z
    .string()
    .min(1, 'This field has to be filled!')
    .email('This is not a valid email!')
    .refine(
      (email) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/.test(email),
      'This email is not in our database!',
    ),
  password: z.string().min(8, 'Password needs to be at least 8 characters!'),
})

type EditProfileData = z.infer<typeof editProfileSchema>

type EditProfileModalProps = {
  openedModal: boolean
  handleCloseEditProfileModal: () => void
}

export function EditProfileModal({
  openedModal,
  handleCloseEditProfileModal,
}: EditProfileModalProps) {
  const userDataMock = {
    name: 'Marcos',
    email: 'teste@teste.com',
    password: '12345678',
  }

  const { updateUser } = useAuth()

  const { handleSubmit, control } = useForm<EditProfileData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      ...userDataMock,
    },
  })

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  async function handleEditProfile(data: EditProfileData) {
    await updateUser(data)

    handleCloseEditProfileModal()
  }

  const onSubmit: SubmitHandler<EditProfileDataProps> = async (data) => {
    console.log('Form submitted:', data)

    await handleEditProfile(data)
  }

  return (
    <div className="text-center">
      <Modal
        open={openedModal}
        onClose={handleCloseEditProfileModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:max-w-lg bg-white shadow-md px-4 py-8 md:p-8 flex flex-col items-center justify-center">
          <Box className="w-full">
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              className="text-2xl text-center text-[#515255] px-2"
            >
              Editar Perfil
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Box className="flex">
                <Box className="w-full flex flex-col items-center justify-center">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Nome Completo"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        {...field}
                        inputProps={{
                          autoComplete: 'off',
                        }}
                      />
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="E-mail"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        {...field}
                        inputProps={{
                          autoComplete: 'off',
                        }}
                      />
                    )}
                  />
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <div className="relative w-full">
                        <TextField
                          type={isPasswordVisible ? 'text' : 'password'}
                          label="Senha"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          {...field}
                          inputProps={{
                            autoComplete: 'off',
                          }}
                        />

                        <button
                          type="button"
                          className="absolute right-4 top-1/2 -translate-y-1/3"
                          onClick={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }
                        >
                          {isPasswordVisible ? (
                            <VisibilityOffIcon className="text-[#515255]" />
                          ) : (
                            <VisibilityIcon className="text-[#515255]" />
                          )}
                        </button>
                      </div>
                    )}
                  />
                </Box>
              </Box>

              <Box className="flex gap-4 items-center">
                <Button
                  className="h-[42px] bg-[#ff5522] border-none text-base text-white font-bold uppercase mt-8 px-6 w-full"
                  variant="outlined"
                  color="primary"
                  type="submit"
                >
                  Salvar
                </Button>

                <Button
                  onClick={handleCloseEditProfileModal}
                  className="h-[42px] bg-[#E0E0E0] text-[#8B8B8B] border-none text-base font-bold uppercase mt-8 px-6 w-full"
                  variant="outlined"
                  color="primary"
                >
                  Cancelar
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default EditProfileModal
