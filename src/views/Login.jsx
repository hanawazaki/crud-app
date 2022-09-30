import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Button from '../components/Button'
import Input from '../components/Input';

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const submit = () => {
    setLoading(true)

    fetch("https://frontend-test-backend.tritronik.com/Auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then((response) => response.json())
      .then((json) => {
        if (json.access_token) {
          localStorage.setItem("access_token", json.access_token)
          navigate("/")
        }
        setLoading(false)
      })
  }

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm mx-auto mt-9">
      <form >
        <div className="form-group mb-6">
          <label htmlFor="username" className="form-label inline-block mb-2 text-gray-700">Username</label>
          <Input
            type='text'
            name='username'
            value={username}
            placeHolder="Enter username"
            handleChange={handleUsernameChange}
            required={true}
          />
        </div>
        <div className="form-group mb-6">
          <label htmlFor="password" className="form-label inline-block mb-2 text-gray-700">Password</label>
          <Input
            type='password'
            name='password'
            value={password}
            placeHolder="Enter password"
            handleChange={handlePasswordChange}
            required={true}
          />
        </div>
        <Button
          onClick={submit}
          type={"button"}
          color={"primary"}
          className="hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          Login
        </Button>
      </form>
    </div>
  )
}

export default Login