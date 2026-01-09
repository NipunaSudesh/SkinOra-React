import React from 'react'

export const Header = ({Title,discription}) => {
  return (
    <div className='mt-10 mb-5 w-full  border-gray-500 flex flex-col justify-center items-center'>
        <h2 className=' text-4xl font-semibold uppercase text-primary'>{Title}</h2>
        <p className='text-gray-700'>{discription}</p>
    </div>
  )
}
