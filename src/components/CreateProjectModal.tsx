'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import { ImageDropzone } from './ImageDropzone'
import { Typography } from '@mui/material'

interface FormDataProps {
  image: File | null
  title: string
  tags: string
  link: string
  description: string
}

export function CreateProjectModal() {
  const [openedModal, setOpenedModal] = useState(false)

  const [formData, setFormData] = useState<FormDataProps>({
    image: null,
    title: '',
    tags: '',
    link: '',
    description: '',
  })

  function handleOpenCreateProjectModal() {
    setOpenedModal(true)
  }

  function handleCloseCreateProjectModal() {
    setOpenedModal(false)
  }

  function handleImageDrop(file: File) {
    setFormData({
      ...formData,
      image: file,
    })
  }

  function handleInputChange(name: keyof FormDataProps) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [name]: event.target.value,
      })
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    console.log('Form submitted:', formData)

    handleCloseCreateProjectModal()
  }

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
          <form onSubmit={handleSubmit}>
            <Box className="flex">
              <ImageDropzone onDrop={handleImageDrop} />
              <Box className="w-full md:w-[413px] flex flex-col items-center justify-center mx-auto">
                <TextField
                  label="Título"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={formData.title}
                  onChange={handleInputChange('title')}
                />
                <TextField
                  label="Tags"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={formData.tags}
                  onChange={handleInputChange('tags')}
                />
                <TextField
                  label="Link"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={formData.link}
                  onChange={handleInputChange('link')}
                />
                <TextField
                  label="Descrição"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={formData.description}
                  onChange={handleInputChange('description')}
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
