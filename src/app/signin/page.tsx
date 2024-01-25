'use client'

import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { BsEyeSlashFill } from 'react-icons/bs'
import Button from '@mui/material/Button'

import { useAuth } from '@/hooks/useAuth'

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
    <div className="max-h-screen grid grid-cols-2 place-items-center">
      <aside className="col-span-1">
        <Image
          src={backgroundImg}
          alt="sign in background image"
          width={512}
          priority
        />
      </aside>
      <section className="flex flex-1 flex-col items-center justify-center p-6">
        <h1 className="text-5xl text-[#222244]">Entre no Orange Portfólio</h1>
        <div className="flex items-center justify-center">
          <button
            className="px-4 py-2 mt-8 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
            onClick={handleSignInWithProvider}
          >
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google logo"
              width={24}
              height={24}
              loading="lazy"
            />
            <span>Entrar com Google</span>
          </button>
        </div>
        <form
          className="w-full p-5 mt-4"
          onSubmit={handleSubmit(handleCreateNewAccount)}
        >
          <div className="w-full flex flex-col justify-center">
            <span className="text-2xl text-[#515255]">
              Faça login com email
            </span>
            <div className="mt-2">
              <label className="text-xs tracking-wide" htmlFor="username">
                Email address
              </label>
              <input
                className="w-full h-14 border border-[#0000003B] self-stretch py-4 px-3 rounded mb-4"
                type="text"
                id="username"
                required
                {...register('email')}
              />
            </div>
            <div className="relative">
              <label className="text-xs tracking-wide" htmlFor="password">
                Password
              </label>
              <input
                className="w-full h-14 border border-[#0000003B] self-stretch py-4 px-3 rounded"
                type="password"
                id="password"
                required
                {...register('password')}
              />
              <BsEyeSlashFill className="text-[#0000008A] text-2xl absolute top-1/2 right-3" />
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
            <button className="w-full flex items-start text-base text-[#818388] mt-4">
              Cadastre-se
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
