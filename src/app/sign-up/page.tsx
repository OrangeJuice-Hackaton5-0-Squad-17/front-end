'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import Image from 'next/image'
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { toast } from 'react-toastify'

import backgroundImg from '@/assets/images/background-sign-up.svg'
import { CustomTextField } from '@/components/CustomTextField'

const newAccountFormValidationSchema = zod.object({
  name: zod.string().min(3),
  surname: zod.string().min(3),
  email: zod
    .string()
    .min(6, 'This field has to be filled!')
    .email('This is not a valid email!'),
  // .refine(
  //   // eslint-disable-next-line
  //   (email) => !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
  //   'This email is not in our database!',
  // ),
  password: zod.string().min(8, 'Password needs to be at least 8 characters!'),
})

type NewAccountFormData = zod.infer<typeof newAccountFormValidationSchema>

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)

  const notifyUserAccountCreated = () =>
    toast.success('Cadastro feito com sucesso', {
      theme: 'colored',
    })

  function handleClickShowPassword() {
    setShowPassword((show) => !show)
  }

  function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
  }

  const { register, handleSubmit, watch, formState, getFieldState, reset } =
    useForm<NewAccountFormData>({
      mode: 'all',
      resolver: zodResolver(newAccountFormValidationSchema),
      defaultValues: {
        name: '',
        surname: '',
        email: '',
        password: '',
      },
    })

  // eslint-disable-next-line
  function handleCreateNewAccount(data: NewAccountFormData) {
    fetch('/accounts/create', { body: undefined })
      .then((response) => {
        return response.json()
      })
      .catch((error) => {
        console.error(error, formState.errors)
      })

    reset()

    notifyUserAccountCreated()
  }

  const name = watch('name')

  const surname = watch('surname')

  const email = watch('email')

  return (
    <Box className="min-h-screen w-full flex items-center justify-center p-4">
      <aside data-aos="fade-right" className="hidden lg:inline lg:w-[549px]">
        <Image src={backgroundImg} alt="sign up background image" priority />
      </aside>
      <section data-aos="fade-left" className="w-full">
        <Box className="flex flex-col items-center justify-center">
          <h1 className="text-center text-2xl md:text-5xl text-[#222244] mb-8">
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
              <CustomTextField
                className="mb-4 lg:m-0"
                type="text"
                id="outlined-input-name"
                label="Nome *"
                variant="outlined"
                {...register('name')}
                error={getFieldState('name').invalid}
                helperText={
                  getFieldState('name').invalid ? 'Campo Inválido!' : ''
                }
              />
              <CustomTextField
                type="text"
                id="outlined-input-surname"
                label="Sobrenome *"
                variant="outlined"
                {...register('surname')}
                error={getFieldState('surname').invalid}
                helperText={
                  getFieldState('surname').invalid ? 'Campo Inválido!' : ''
                }
              />
            </Box>
            <CustomTextField
              type="email"
              id="outlined-input-email"
              label="Email address"
              variant="outlined"
              {...register('email')}
              error={getFieldState('email').invalid}
              helperText={
                getFieldState('email').invalid ? 'Campo Inválido!' : ''
              }
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
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#E0E3E7',
                  },
                  '&:hover > .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#6F7E8C',
                  },
                }}
              />
            </FormControl>
            <Button
              type="submit"
              className="h-[42px] text-white text-sm font-bold tracking-wide uppercase mt-4 bg-[#ff5522] hover:bg-[#cc4400]"
              variant="contained"
              color="inherit"
              size="large"
              disabled={!formState.isValid}
            >
              Cadastrar
            </Button>
          </form>
        </Box>
      </section>
    </Box>
  )
}
