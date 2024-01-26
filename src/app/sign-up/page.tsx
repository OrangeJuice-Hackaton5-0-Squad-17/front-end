'use client'

import { IoEyeSharp } from 'react-icons/io5'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

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
      <section className="p-6 w-full">
        <h1 className="text-center text-[#224] text-2xl mb-8">Cadastre-se</h1>
        <form
          onSubmit={handleSubmit(handleCreateNewAccount)}
          className="flex flex-col gap-4"
        >
          <div>
            <input
              className="border rounded-md border-[#0000003a] p-3 w-full"
              type="text"
              placeholder="Nome *"
              {...register('name')}
            />
          </div>
          <div>
            <input
              className="border rounded-md border-[#0000003a] p-3 w-full"
              type="text"
              placeholder="Sobrenome *"
              {...register('surname')}
            />
          </div>
          <div>
            <input
              className="border rounded-md border-[#0000003a] p-3 w-full"
              type="text"
              placeholder="Email address *"
              {...register('email')}
            />
          </div>
          <div className="relative">
            <input
              className="border rounded-md border-[#0000003a] p-3 w-full"
              type="password"
              placeholder="Password *"
              {...register('password')}
            />
            <IoEyeSharp className="text-[#0000008A] text-2xl absolute top-1/2 right-3 -translate-y-1/2" />
          </div>
          <button
            type="submit"
            className="bg-[#f52] shadow shadow-[#00000033] rounded-md text-white uppercase p-2 w-full"
          >
            Cadastrar
          </button>
        </form>
      </section>
    </main>
  )
}
