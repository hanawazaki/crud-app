import React from 'react'
import { useNavigate } from "react-router-dom";

const Header = ({ title }) => {

  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className="nav">
      <div className="flex justify-between items-center w-100 mb-3 mb-md-0">
        <div className="flex justify-start items-center">
          <h2 className="nav-title">{title}</h2>
        </div>
      </div>

      <div className="logout">
        <a href="#" className="text-bold" onClick={handleSignOut}>Sign out</a>
      </div>

    </div>
  )
}

export default Header