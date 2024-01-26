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
      (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
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
    <main className="min-h-screen flex items-center justify-center">
      <aside className="max-w-[549px]">
        <Image src={backgroundImg} alt="sign up background image" priority />
      </aside>
      <section className="flex flex-1 flex-col items-center justify-center">
        <div className="w-[517px]">
          <h1 className="text-center text-5xl text-[#222244 leading-10 mb-8">
            Cadastre-se
          </h1>
          <form
            onSubmit={handleSubmit(handleCreateNewAccount)}
            className="flex flex-col gap-4"
          >
            <Box className="flex items-center justify-between">
              <TextField
                type="text"
                id="outlined-basic"
                label="Nome *"
                variant="outlined"
                {...register('name')}
              />
              <TextField
                type="text"
                id="outlined-basic"
                label="Sobrenome *"
                variant="outlined"
                {...register('surname')}
              />
            </Box>
            <TextField
              type="text"
              id="outlined-basic"
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
              className="w-full h-10 text-white text-sm font-medium tracking-wide uppercase mt-4 bg-[#ff5522] hover:bg-[#cc4400]"
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
