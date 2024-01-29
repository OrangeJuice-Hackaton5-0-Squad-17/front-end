'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import Image from 'next/image'
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Box,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import backgroundImg from '@/assets/images/background-sign-up.svg'

const newAccountFormValidationSchema = zod.object({
  name: zod.string().min(3),
  surname: zod.string().min(3),
  email: zod
    .string()
    .min(1, 'This field has to be filled!')
    .email('This is not a valid email!')
    .refine(
      // eslint-disable-next-line
      (email) => !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
      'This email is not in our database!',
    ),
  password: zod.string().min(8, 'Password needs to be at least 8 characters!'),
})

type NewAccountFormData = zod.infer<typeof newAccountFormValidationSchema>

interface Account {
  name: string
  surname: string
  email: string
  password: string
}

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)

  function handleClickShowPassword() {
    setShowPassword((show) => !show)
  }

  function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
  }

  const { register, handleSubmit, formState, reset } =
    useForm<NewAccountFormData>({
      resolver: zodResolver(newAccountFormValidationSchema),
      defaultValues: {
        name: '',
        surname: '',
        email: '',
        password: '',
      },
    })

  // eslint-disable-next-line
  function handleCreateNewAccount(data: Account) {
    fetch('/accounts/create', { body: undefined })
      .then((response) => {
        return response.json()
      })
      .catch((error) => {
        console.error(error)
      })

    reset()
  }

  console.log(formState.errors)

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4">
      <aside data-aos="fade-right" className="hidden lg:inline lg:w-[549px]">
        <Image src={backgroundImg} alt="sign up background image" priority />
      </aside>
      <section data-aos="fade-left" className="w-full">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center text-2xl lg:text-5xl text-[#222244] mb-8">
            Cadastre-se
          </h1>
          <form
            onSubmit={handleSubmit(handleCreateNewAccount)}
            className="flex flex-col gap-4"
          >
            <Box
              className="lg:flex lg:items-center lg:justify-between lg:gap-4"
              sx={{
                '& .MuiTextField-root': { width: '100%' },
              }}
            >
              <TextField
                className="mb-4 lg:m-0"
                type="text"
                id="outlined-input-name"
                label="Nome *"
                variant="outlined"
                {...register('name')}
              />
              <TextField
                type="text"
                id="outlined-input-surname"
                label="Sobrenome *"
                variant="outlined"
                {...register('surname')}
              />
            </Box>
            <TextField
              type="text"
              id="outlined-input-email"
              label="Email address"
              variant="outlined"
              {...register('email')}
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                {...register('password')}
              />
            </FormControl>
            <Button
              type="submit"
              className="h-[42px] text-white text-sm font-medium tracking-wide uppercase mt-4 bg-[#ff5522] hover:bg-[#cc4400]"
              variant="contained"
              color="inherit"
              size="large"
            >
              Cadastrar
            </Button>
          </form>
        </div>
      </section>
    </main>
  )
}
