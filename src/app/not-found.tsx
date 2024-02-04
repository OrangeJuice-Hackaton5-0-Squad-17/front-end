import Link from 'next/link'
import { headers } from 'next/headers'
import { TbGhost2 } from 'react-icons/tb'

export default async function NotFound() {
  const headerParams = headers()

  const domain = headerParams.get('x-forwarded-host')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-zinc-500">
      <TbGhost2 size={48} />
      <div className="h-full flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold shadow-white">
          Not Found: ${domain}
        </h2>
        <p className="text-xl">Could not find requested resource</p>
        <Link className="mt-10 text-blue-300" href="/my-projects">
          Return Home
        </Link>
      </div>
    </div>
  )
}
