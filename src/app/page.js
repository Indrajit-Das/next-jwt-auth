import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <div>
        <h1 className='text-center font-bold py-3'>Welcome to JWT Auth Project</h1>
        <div className='text-center mt-20'>
          <Link href="/login" className="bg-blue-600 text-white rounded-lg px-3 py-2   mr-2">Login</Link>
          <Link href="/register" className="bg-blue-600 text-white rounded-lg px-3 py-2 ml-2">Register</Link>
        </div>
      </div>
    </main>
  )
}
