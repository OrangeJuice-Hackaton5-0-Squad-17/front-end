import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

import dropzoneIcon from '@/assets/images/dropzone-icon.svg'

interface ImageDropzoneProps {
  onDrop: (file: File) => void
}

export function ImageDropzone({ onDrop }: ImageDropzoneProps) {
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onDrop(acceptedFiles[0])
      }
    },
    [onDrop],
  )

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
      'text/html': ['.html', '.htm'],
    },
    onDrop: handleDrop,
  })

  return (
    <div {...getRootProps()} className="dropzone">
      <p className="text-base text-[#515255] mb-4">
        Selecione o conteúdo que você deseja fazer upload
      </p>
      <div className="w-full h-[304px] bg-[#e6e9f2] rounded cursor-pointer">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <input className="w-full h-full" {...getInputProps()} />
          <Image src={dropzoneIcon} alt="dropzone icon" width={46} priority />
          <span className="text-base text-center text-[#303133] mt-4">
            Compartilhe seu talento com milhares de pessoas
          </span>
        </div>
      </div>
    </div>
  )
}
