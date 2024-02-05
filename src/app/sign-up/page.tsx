'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import {
  Box,
  FormControl,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { toast } from 'react-toastify'

import { api } from '@/services/api'

import { CustomTextField } from '@/components/CustomTextField'

import {
  createAccountFormValidationSchema,
  CreateAccountFormData,
} from '@/schema/createAccountSchema'

import backgroundImg from '@/assets/images/background-sign-up.svg'

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()

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
    useForm<CreateAccountFormData>({
      mode: 'all',
      resolver: zodResolver(createAccountFormValidationSchema),
      defaultValues: {
        name: '',
        surname: '',
        email: '',
        password: '',
      },
    })

  // eslint-disable-next-line
  async function handleCreateNewAccount(data: CreateAccountFormData) {
    await api.post('/user', data)

    reset()

    notifyUserAccountCreated()

    setTimeout(() => {
      router.push('/sign-in')
    }, 2000)
  }

  const name = watch('name')

  const surname = watch('surname')

  const email = watch('email')

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
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
              <CustomTextField
                id="outlined-input-adornment-password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
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
                  ),
                }}
                label="Password"
                {...register('password')}
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
            <Link
              href="sign-in"
              className="w-max flex items-start text-base text-[#92aef5]"
            >
              Já tenho uma conta
            </Link>
          </form>
        </Box>
      </section>
    </div>
  )
}
