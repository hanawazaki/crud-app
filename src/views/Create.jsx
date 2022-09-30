import React, { useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import Button from '../components/Button'
import Header from '../components/Header'
import Input from '../components/Input'
import Wrapper from '../components/Wrapper'

const Create = ({ }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [owner, setOwner] = useState('')

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const handleOwnerChange = (event) => {
    setOwner(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('name', name)
    console.log('description', description)
    console.log('owner', owner)
  }

  return (
    <Wrapper >
      <Header title="Add Project" />
      <Breadcrumbs page={"Add Project"} />
      <div className="content mt-2">
        <form>
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
          <Button
            onClick={handleSubmit}
            type={"button"}
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