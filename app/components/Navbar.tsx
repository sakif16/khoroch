import Link from 'next/link'
import React from 'react'
Link

const Navbar = () => {
  return (
    <div className='flex items-center justify-center gap-5'>
      <Link href={'/'}>Homepage</Link>
      <Link href={'/Signin'}>SginIn</Link>
      <Link href={'/Signup'}>SignUp</Link>
      <Link href={'/Dashboard'}>Dashboard</Link>
    </div>
  )
}

export default Navbar
