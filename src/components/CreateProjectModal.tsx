'use client'

import { Button, Modal, Box, Typography } from '@mui/material'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useWindowSize } from '@/hooks/useWindowsSize'

import {
  createProjectFormSchema,
  CreateProjectFormData,
} from '@/schema/createProjectSchema'

import { ImageDropzone } from './ImageDropzone'
import { CustomTextField } from './CustomTextField'

interface CreateProjectModalProps {
  handleCloseCreateProjectModal: () => void
  openedModal: boolean
}

interface CreateProjectFormDataProps {
  image?: File | null
  title: string
  tags: string
  link: string
  description: string
}

const formInputTypes = ['title', 'tags', 'link', 'description'] as const

const formattedFormInputTypes = ['Título', 'Tags', 'Link', 'Descrição']

export function CreateProjectModal({
  handleCloseCreateProjectModal,
  openedModal,
}: CreateProjectModalProps) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateProjectFormData>({
    mode: 'all',
    resolver: zodResolver(createProjectFormSchema),
    defaultValues: {
      title: '',
      tags: '',
      link: '',
      description: '',
      image: null,
    },
  })

  const size = useWindowSize()

  function handleImageDrop(file: File) {
    setValue('image', file)
  }

  const onSubmit: SubmitHandler<CreateProjectFormDataProps> = (data) => {
    console.log('Form submitted:', data)

    handleCloseCreateProjectModal()
  }

  console.log(errors?.image?.message)

  return (
    <>
      <Modal
        open={openedModal}
        onClose={handleCloseCreateProjectModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        data-aos="zoom-out"
      >
        <section
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[312px] md:w-[680px] lg:w-[890px] bg-white shadow-md p-8 ${size.width <= 375 ? 'px-3' : 'px-8'}`}
        >
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            className="text-2xl text-[#515255] mb-6"
          >
            Adicionar projeto
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="flex flex-col md:flex-row">
              <ImageDropzone onDrop={handleImageDrop} />
              <Box className="w-full md:w-[413px] flex flex-col items-center justify-end mx-auto">
                {formInputTypes.map((type, index) => (
                  <Controller
                    key={index}
                    name={type}
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        label={formattedFormInputTypes[index]}
                        multiline={type === 'description'}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        {...field}
                      />
                    )}
                  />
                ))}
              </Box>
            </Box>
            <Box className="flex gap-4 mt-4">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="w-[101px] h-[42px] text-[#fcfdff] text-base font-bold uppercase bg-[#ff5522] hover:bg-[#c44e2a]"
              >
                Salvar
              </Button>
              <Button
                onClick={handleCloseCreateProjectModal}
                type="submit"
                variant="contained"
                color="primary"
                className="w-[124px] h-[42px] text-[##969393] text-base font-bold uppercase bg-[#a1a1a1] hover:bg-[#868686]"
              >
                Cancelar
              </Button>
            </Box>
          </form>
        </section>
      </Modal>
    </>
  )
}
