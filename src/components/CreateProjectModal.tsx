'use client'

import { useState } from 'react'
import {
  Button,
  Modal,
  Box,
  TextField,
  TextareaAutosize,
  Typography,
} from '@mui/material'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { ImageDropzone } from './ImageDropzone'

interface CreateProjectFormDataProps {
  image?: File | null
  title: string
  tags: string
  link: string
  description: string
}

const MAX_FILE_SIZE = 5000000

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const createProjectFormSchema = z.object({
  image: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB!`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
  title: z.string().min(1).max(50),
  tags: z.string().min(1).max(50),
  link: z.string().min(1).max(50),
  description: z.string().min(1).max(200),
})

type CreateProjectFormData = z.infer<typeof createProjectFormSchema>

export function CreateProjectModal() {
  const [openedModal, setOpenedModal] = useState(false)

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectFormSchema),
    defaultValues: {
      title: '',
      tags: '',
      link: '',
      description: '',
      image: null,
    },
  })

  function handleOpenCreateProjectModal() {
    setOpenedModal(true)
  }

  function handleCloseCreateProjectModal() {
    setOpenedModal(false)
  }

  function handleImageDrop(file: File) {
    setValue('image', file)
  }

  const onSubmit: SubmitHandler<CreateProjectFormDataProps> = (data) => {
    console.log('Form submitted:', data)

    handleCloseCreateProjectModal()
  }

  console.log(errors?.image?.message)

  return (
    <div className="text-center">
      <Button
        variant="contained"
        onClick={handleOpenCreateProjectModal}
        className="mt-4"
      >
        Open Form Modal
      </Button>
      <Modal
        open={openedModal}
        onClose={handleCloseCreateProjectModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-[890px] bg-white shadow-md p-8">
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            className="text-2xl text-[#515255] mb-6"
          >
            Adicionar projeto
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="flex">
              <ImageDropzone onDrop={handleImageDrop} />
              <Box className="w-full md:w-[413px] flex flex-col items-center justify-center mx-auto">
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Título"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Tags"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="link"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Link"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextareaAutosize
                      aria-label="description textarea"
                      minRows={3}
                      placeholder="Descrição"
                      className="w-full min-h-[120px] max-h-[120px] border border-gray-300 rounded p-2 mt-4"
                      {...field}
                    />
                  )}
                />
              </Box>
            </Box>
            <Box className="flex gap-4 mt-4">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="w-[101px] h-[42px] text-[#fcfdff] text-base font-bold uppercase bg-[#ff5522] hover:bg-[#f03f0a]"
              >
                Salvar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="w-[124px] h-[42px] text-[##969393] text-base font-bold uppercase bg-[#a1a1a1] hover:bg-[#868686]"
              >
                Cancelar
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  )
}
