'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { Box, Paper, Typography } from '@mui/material'

import dropzoneIcon from '@/assets/images/dropzone-icon.svg'

interface ImageDropzoneProps {
  onDrop: (file: File) => void
}

export function ImageDropzone({ onDrop }: ImageDropzoneProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onDrop(acceptedFiles[0])
      }

      const file = acceptedFiles

      const reader = new FileReader()

      reader.onload = () => {
        if (typeof reader.result === 'string') setImagePreview(reader.result)
      }

      reader.readAsDataURL(file[0])
    },
    [onDrop],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
      'text/html': ['.html', '.htm'],
    },
    onDrop: handleDrop,
  })

  return (
    <Paper
      {...getRootProps()}
      className={`dropzone shadow-none ${isDragActive ? 'bg-gray-200' : ''}`}
    >
      <Typography className="text-base text-[#515255] mb-4">
        Selecione o conteúdo que você deseja fazer upload
      </Typography>
      <Box className="w-full h-[304px] bg-[#e6e9f2] rounded cursor-pointer shadow-lg">
        <Box className="w-full h-full flex flex-col items-center justify-center">
          <input className="w-full h-full" {...getInputProps()} />
          {imagePreview ? (
            <Box className="w-full h-full relative">
              <Image
                src={imagePreview}
                alt="preview image"
                layout="fill"
                objectFit="contain"
                priority
              />
            </Box>
          ) : (
            <>
              <Image
                src={dropzoneIcon}
                alt="dropzone icon"
                width={46}
                priority
              />
              <Typography className="text-base text-center text-[#303133] mt-4">
                {isDragActive
                  ? 'Solte a imagem aqui'
                  : 'Compartilhe seu talento com milhares de pessoas'}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Paper>
  )
}
