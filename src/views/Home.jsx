import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Spinner from '../components/Spinner'
import { useNavigate } from "react-router-dom";
import Button from '../components/Button'
import Input from '../components/Input';
import Header from '../components/Header';
import Wrapper from '../components/Wrapper';
import Modal from '../components/Modal';

const Home = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://frontend-test-backend.tritronik.com/v1/projects/?sortFields=id&sortOrder=asc", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.content) {
          setData(json.content)
          setLoading(false)
          console.log('', json.content)
        }
      })
  }, [])

  return (
    <Wrapper>
      <Header title="Project List" />
      <div className="add flex justify-end">
        <Button
          type="button"
          color="primary"
          className='cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105'
          onClick={() => navigate('/create')}
        >
          Add Project
        </Button>

      </div>
      <div className="flex flex-wrap mt-2 pb-5">
        {
          loading ? (
            <div className="flex justify-center items-center w-full">
              <Spinner />
            </div>
          ) :
            <div className="w-full py-2">
              <div className=" user-card w-100">
                <div className="mb-7">
                  <div className="overflow-x-auto ">
                    <div className="py-2 inline-block min-w-full ">
                      <div className="overflow-hidden">
                        <table className="min-w-full">
                          <thead className="bg-white border-b">
                            <tr>
                              <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                #
                              </th>
                              <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                Name
                              </th>
                              <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                Description
                              </th>
                              <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                Owner
                              </th>
                              <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              data && data.map((item, index) => {
                                return (
                                  <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                      {item.name}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                      {item.description}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                      {item.owner}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap gap-1">
                                      <span className='mx-2'>
                                        <Button
                                          className='cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105'
                                        >
                                          Edit
                                        </Button>
                                      </span>
                                      <span>
                                        <Button
                                          className='cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105'
                                        >
                                          Delete
                                        </Button>
                                      </span>
                                    </td>
                                  </tr>
                                )
                              }
                              )
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mb-3">
                  <nav aria-label="Page navigation example">
                    <ul className="flex list-style-none">
                      <li className="page-item disabled"><a
                        className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 pointer-events-none focus:shadow-none"
                        href="#" tabIndex="-1" aria-disabled="true">Previous</a></li>
                      <li className="page-item"><a
                        className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        href="#">1</a></li>
                      <li className="page-item active"><a
                        className="page-link relative block py-1.5 px-3 rounded border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
                        href="#">2 </a></li>
                      <li className="page-item"><a
                        className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        href="#">3</a></li>
                      <li className="page-item"><a
                        className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        href="#">Next</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
        }
      </div>

    </Wrapper>
  )
}

export default Home