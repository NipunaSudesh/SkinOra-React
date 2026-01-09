import React from 'react'
import TNavBar from './TNavBar';
import BNavBar from './BNavBar';

export default function NavBar() {
  return (
    <div className='flex flex-col'>
      <TNavBar />
      <BNavBar />
    </div>
  )
}
