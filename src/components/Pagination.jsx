import React, { useState, useEffect, useCallback } from 'react'
import Spinner from '../components/Spinner'
import { useNavigate } from "react-router-dom";
import Button from '../components/Button'
import Input from '../components/Input';
import Header from '../components/Header';
import Wrapper from '../components/Wrapper';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

const MyPaginate = styled(ReactPaginate).attrs({
  // You can redifine classes here, if you want.
  activeClassName: 'active', // default to "disabled"
})`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0 5rem;
  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

const Pagination = ({ items, deletedItem, itemperpage }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [isloading, setIsLoading] = useState(true)

  const itemsPerPage = itemperpage;
  const navigate = useNavigate();

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

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

      const datacopy = [...items]
      datacopy.splice(datacopy.findIndex(item => item.id === id), 1)
      deletedItem(datacopy)

      navigate("/");
    }
    catch (error) {
      console.log(error);
    }
  }
  const fetchCurrentItem = async () => {
    const endOffset = itemOffset + itemsPerPage;

    await setCurrentItems(items.slice(itemOffset, endOffset));
    await setPageCount(Math.ceil(items.length / itemsPerPage));
  }

  useEffect(() => {
    if (items.length > 0) {
      fetchCurrentItem();
      setIsLoading(false)
    }

  }, [items, itemOffset, itemsPerPage])
  return (
    <div>
      <div className="flex flex-wrap mt-2 pb-5 ">
        {
          isloading ? (
            <div className="flex justify-center items-center w-full">
              <Spinner />
            </div>
          ) :
            <div className="w-full py-2">
              <div className=" bg-white w-100 shadow-md h-full rounded-3xl mb-10 p-0">
                <div className="mb-7">
                  <div className="overflow-x-auto ">
                    <div className="py-2 inline-block min-w-full ">
                      <div className="overflow-hidden">
                        <table className="min-w-full">
                          <thead className="bg-white border-b">
                            <tr>
                              <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                                ID
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
                              currentItems && currentItems.map((item, index) => {
                                return (
                                  <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
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
                <MyPaginate
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                />
              </div>
            </div>
        }
      </div>

    </div>
  )
}

export default Pagination