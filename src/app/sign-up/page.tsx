import { IoEyeSharp } from 'react-icons/io5'

export default function SignUp() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <section className="p-6 w-full">
        <h1 className="text-center text-[#224] text-2xl mb-8">Cadastre-se</h1>

        <form className="flex flex-col gap-4">
          <div>
            <input
              className="border rounded-md border-[#0000003a] p-3 w-full"
              type="text"
              placeholder="Nome *"
            />
          </div>

          <div>
            <input
              className="border rounded-md border-[#0000003a] p-3 w-full"
              type="text"
              placeholder="Sobrenome *"
            />
          </div>

          <div>
            <input
              className="border rounded-md border-[#0000003a] p-3 w-full"
              type="text"
              placeholder="Email address *"
            />
          </div>

          <div className="relative">
            <input
              className="border rounded-md border-[#0000003a] p-3 w-full"
              type="password"
              placeholder="Password *"
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
