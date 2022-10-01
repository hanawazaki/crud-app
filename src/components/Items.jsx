import React from 'react'
import React, { useState, useEffect, useCallback } from 'react'

const Items = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const res = await fetch(`https://frontend-test-backend.tritronik.com/v1/projects/?sortFields=id&sortOrder=desc`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("access_token")
      }
    });

    const json = await res.json();

    if (json.content) {
      setData(json.content)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch("https://frontend-test-backend.tritronik.com/v1/projects/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
      });

      if (!res.ok) {
        throw new Error(res.message);
      }

      const datacopy = [...data]
      datacopy.splice(datacopy.findIndex(item => item.id === id), 1)
      setData(datacopy)

      navigate("/");
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>
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
                                onClick={() => navigate('/edit/' + item.id)}
                                color='success'
                                className='cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105'
                              >
                                Edit
                              </Button>
                            </span>
                            <span>
                              <Button
                                onClick={() => handleDelete(item.id)}
                                color='danger'
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
    </>
  )
}

export default Items