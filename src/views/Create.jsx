import React, { useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import Button from '../components/Button'
import Header from '../components/Header'
import Input from '../components/Input'
import Wrapper from '../components/Wrapper'
import { useNavigate } from 'react-router-dom'

const Create = ({ }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [owner, setOwner] = useState('')
  const [component, setComponent] = useState('')
  const [path, setPath] = useState('')

  const navigate = useNavigate()

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const handleOwnerChange = (event) => {
    setOwner(event.target.value)
  }

  const handleComponentChange = (event) => {
    setComponent(event.target.value)
  }

  const handlePathChange = (event) => {
    setPath(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const body = {
      "component": component,
      "description": description,
      "name": name,
      "owner": owner,
      "pages": [
        {
          "component": "string",
          "description": "string",
          "iconName": "string",
          "id": 10,
          "miniName": "string",
          "name": "string",
          "pageType": "DASHBOARD",
          "path": "string",
          "permission": "string",
          "projectId": 0,
          "title": "string",
          "visibleInMenu": true
        }
      ],
      "path": path
    }

    try {
      const res = await fetch("https://frontend-test-backend.tritronik.com/v1/projects/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("access_token")
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        throw new Error(res.message);
      }

      const responseData = await res.json();
      console.log(responseData)
      navigate("/");
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <Wrapper >
      <Header title="Add Project" />
      <Breadcrumbs page={"Add Project"} />
      <div className="content mt-2">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-6">
            <label htmlFor="component" className="form-label inline-block mb-2 text-gray-700">Component</label>
            <Input
              type='text'
              name='component'
              value={component}
              placeHolder="Enter component"
              handleChange={handleComponentChange}
              required={true}
            />
          </div>
          <div className="form-group mb-6">
            <label htmlFor="name" className="form-label inline-block mb-2 text-gray-700">Name</label>
            <Input
              type='text'
              name='name'
              value={name}
              placeHolder="Enter name"
              handleChange={handleNameChange}
              required={true}
            />
          </div>
          <div className="form-group mb-6">
            <label htmlFor="password" className="form-label inline-block mb-2 text-gray-700">Description</label>
            <Input
              isTextarea={true}
              type='text'
              name='description'
              value={description}
              placeHolder="Enter description"
              handleChange={handleDescriptionChange}
              required={true}
            />
          </div>
          <div className="form-group mb-6">
            <label htmlFor="owner" className="form-label inline-block mb-2 text-gray-700">Owner</label>
            <Input
              type='text'
              name='owner'
              value={owner}
              placeHolder="Enter owner"
              handleChange={handleOwnerChange}
              required={true}
            />
          </div>
          <div className="form-group mb-6">
            <label htmlFor="path" className="form-label inline-block mb-2 text-gray-700">Path</label>
            <Input
              type='text'
              name='path'
              value={path}
              placeHolder="Enter path"
              handleChange={handlePathChange}
              required={true}
            />
          </div>
          <Button
            // onClick={handleSubmit}
            type={"submit"}
            color={"primary"}
            className="hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            Submit
          </Button>
        </form>
      </div>
    </Wrapper>
  )
}

export default Create