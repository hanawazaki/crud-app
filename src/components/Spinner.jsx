import React from 'react'
import loading from '../assets/loading.png'
const Spinner = () => {
  return (
    <div className='flex justify-center p-4'>
      <img src={loading}
        alt='loading...'
        width="32"
        height="32"
        className='animate-spin'
      />
    </div>
  )
}

export default Spinner