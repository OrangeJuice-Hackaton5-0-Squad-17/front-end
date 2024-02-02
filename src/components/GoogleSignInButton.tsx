import Image from 'next/image'

interface ButtonProps {
  handleSignInWithProvider: () => Promise<void>
}

export function GoogleSignInButton({ handleSignInWithProvider }: ButtonProps) {
  return (
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
  )
}
