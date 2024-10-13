import React from 'react'

const Navbar1 = () => {
  return (
    <div>
      <nav className='flex border border-black p-5 justify-between bg-[#8097b4]' >
        <div className='font-bold'>i Task</div>
        <ul className='flex gap-10'>
            <li className='cursor-pointer hover:font-bold'>Home</li>
            <li className='cursor-pointer hover:font-bold'>Contact</li>
            <li className='cursor-pointer hover:font-bold'>Your tasks</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar1
