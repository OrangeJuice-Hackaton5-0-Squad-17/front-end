'use client'

import { useState } from 'react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { useAuth } from '@/hooks/useAuth'

import { GoogleSignInButton } from '@/components/GoogleSignInButton'

import backgroundImg from '@/assets/images/background-sign-in.svg'

const newAccountFormValidationSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.')
    .refine(
      (email) => email === 'abcd@fg.com',
      'This email is not in our database',
    ),
  password: zod.string().min(8, 'Password needs to be at least 8 characters!'),
})

type NewAccountFormData = zod.infer<typeof newAccountFormValidationSchema>

interface Account {
  email: string
  password: string
}

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  function handleClickShowPassword() {
    setShowPassword((show) => !show)
  }

  function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
  }

  const { user, signInWithGoogle } = useAuth()

  const { register, handleSubmit, formState, reset } =
    useForm<NewAccountFormData>({
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

    redirect(`/${user?.id}/projects`)
  }

  // eslint-disable-next-line
  function handleCreateNewAccount(data: Account) {
    fetch('/accounts/create', { body: undefined })
      .then((response) => {
        return response.json()
      })
      .catch((error) => {
        console.log(error, formState.errors)

        throw new Error()
      })

    reset()
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
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
          <div className="w-full flex flex-col justify-center">
            <span className="text-base md:text-2xl text-[#515255]">
              Faça login com email
            </span>
            <div className="w-full flex flex-col items-center justify-center gap-2 mt-3">
              <TextField
                className="w-full"
                type="text"
                id="outlined-basic"
                label="Email address"
                variant="outlined"
                {...register('email')}
              />
              <FormControl
                className="w-full"
                sx={{ m: 1, width: '25ch' }}
                variant="outlined"
              >
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
            </div>
            <Button
              type="submit"
              className="w-full h-10 text-white text-sm font-medium tracking-wide mt-4 bg-[#ff5522] hover:bg-[#cc4400]"
              variant="contained"
              color="inherit"
              size="large"
            >
              Entrar
            </Button>
            <Link
              href="sign-up"
              className="w-full flex items-start text-base text-[#818388] mt-4"
            >
              Cadastre-se
            </Link>
          </div>
        </form>
      </section>
    </div>
  )
}
