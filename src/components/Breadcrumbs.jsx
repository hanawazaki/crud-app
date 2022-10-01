import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumbs = ({ page }) => {
  return (
    <>
      <nav className="rounded-md w-full my-7">
        <ol className="list-reset flex">
          <li><Link to="/" className="text-blue-600 hover:text-blue-700">Home</Link></li>
          <li><span className="text-gray-500 mx-2">/</span></li>
          <li className="text-gray-500">{page}</li>
        </ol>
      </nav>
    </>
  )
}

export default Breadcrumbs