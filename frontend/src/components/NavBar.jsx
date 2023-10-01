import React from 'react'

function NavBar() {
  return (
    <div className='container w-full bg-teal-900 h-16 sticky p-0 m-0'>
        <div className='flex h-full items-center justify-between'>
            <div className='container ms-6 text-white font-bold'>
                Guten-Morgen
            </div>
            <div className='container flex items-center justify-end me-6 text-white font-bold'>
                <p className='me-4'>Register</p>
                <p>Login</p>
            </div>
        </div>
    </div>
  )
}

export default NavBar