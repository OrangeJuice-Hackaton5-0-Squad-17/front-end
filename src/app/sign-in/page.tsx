'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  Box,
  FormControl,
  InputAdornment,
  IconButton,
  Button,
  Typography,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { toast } from 'react-toastify'

import { useAuth } from '@/hooks/useAuth'

import { GoogleSignInButton } from '@/components/GoogleSignInButton'
import { CustomTextField } from '@/components/CustomTextField'

import backgroundImg from '@/assets/images/background-sign-in.svg'

const newAccountFormValidationSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.')
    .refine(
      // eslint-disable-next-line
      (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
      'This email is not in our database',
    ),
  password: zod.string().min(8, 'Password needs to be at least 8 characters!'),
})

type NewAccountFormData = zod.infer<typeof newAccountFormValidationSchema>

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  const notifyUserAuthenticationFailed = () =>
    toast.error('Falha na autenticação', {
      theme: 'colored',
    })

  function handleClickShowPassword() {
    setShowPassword((show) => !show)
  }

  function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
  }

  const { user, signInWithGoogle } = useAuth()

  const { register, handleSubmit, formState, watch, getFieldState, reset } =
    useForm<NewAccountFormData>({
      mode: 'all',
      resolver: zodResolver(newAccountFormValidationSchema),
      defaultValues: {
        email: '',
        password: '',
      },
    })

  async function handleSignInWithProvider() {
    if (!user) {
      await signInWithGoogle()
    }

    redirect(`/${user?.id}/my-projects`)
  }

  // eslint-disable-next-line
  function handleCreateNewAccount(data: NewAccountFormData) {
    fetch('/accounts/create', { body: undefined })
      .then((response) => {
        return response.json()
      })
      .catch((error) => {
        console.log(error, formState.errors)

        notifyUserAuthenticationFailed()

        throw new Error()
      })

    reset()
  }

  const email = watch('email')

  return (
    <Box className="min-h-screen w-full flex items-center justify-center p-4">
      <aside data-aos="fade-right" className="hidden lg:inline lg:w-[549px]">
        <Image
          src={backgroundImg}
          alt="sign in background image"
          width={512}
          priority
        />
      </aside>
      <section
        data-aos="fade-left"
        className="flex flex-1 flex-col items-center justify-center p-6"
      >
        <h1 className="text-2xl text-nowrap md:text-5xl text-[#222244]">
          Entre no Orange Portfólio
        </h1>
        <GoogleSignInButton
          handleSignInWithProvider={handleSignInWithProvider}
        />
        <form
          className="w-[312px] md:w-[517px] p-5 mt-4"
          onSubmit={handleSubmit(handleCreateNewAccount)}
        >
          <Box className="w-full flex flex-col justify-center">
            <Typography className="text-base md:text-2xl text-[#515255]">
              Faça login com email
            </Typography>
            <Box className="w-full flex flex-col items-center justify-center gap-2 mt-3">
              <CustomTextField
                className="w-full"
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
              <FormControl
                className="w-full"
                sx={{ m: 1, width: '25ch' }}
                variant="outlined"
              >
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
            </Box>
            <Button
              type="submit"
              className="w-full h-10 text-white text-sm font-bold tracking-wide mt-4 bg-[#ff5522] hover:bg-[#cc4400]"
              variant="contained"
              color="inherit"
              size="large"
              disabled={!formState.isValid}
            >
              Entrar
            </Button>
            <Link
              href="sign-up"
              className="w-full flex items-start text-base text-[#818388] mt-4"
            >
              Cadastre-se
            </Link>
          </Box>
        </form>
      </section>
    </Box>
  )
}
