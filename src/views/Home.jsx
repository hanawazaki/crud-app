import React, { useState, useEffect, useCallback } from 'react'
import Spinner from '../components/Spinner'
import { useNavigate } from "react-router-dom";
import Button from '../components/Button'
import Input from '../components/Input';
import Header from '../components/Header';
import Wrapper from '../components/Wrapper';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import Pagination from '../components/Pagination';

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item, index) => (
          <div key={index}>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}

const Home = () => {

  const [data, setData] = useState([])
  const [itemperpage, setItemperpage] = useState(0)

  const navigate = useNavigate();

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
      setItemperpage(json.totalElements)
      // setLoading(false)
    }
  }

  const deleted = (data) => {
    setData(data)
  }

  useEffect(() => {
    fetchData()

  }, [])



  // return (
  //   <Wrapper>
  //     <Header title="Project List" />
  //     <div className="add flex justify-end my-7">
  //       <Button
  //         type="button"
  //         color="primary"
  //         className='cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105'
  //         onClick={() => navigate('/create')}
  //       >
  //         Add Project
  //       </Button>

  //     </div>
  //     <div className="flex flex-wrap mt-2 pb-5 ">
  //       {
  //         loading ? (
  //           <div className="flex justify-center items-center w-full">
  //             <Spinner />
  //           </div>
  //         ) :
  //           <div className="w-full py-2">
  //             <div className=" bg-white w-100 shadow-md h-full rounded-3xl mb-10 p-0">
  //               <div className="mb-7">
  //                 <div className="overflow-x-auto ">
  //                   <div className="py-2 inline-block min-w-full ">
  //                     <div className="overflow-hidden">
  //                       <table className="min-w-full">
  //                         <thead className="bg-white border-b">
  //                           <tr>
  //                             <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
  //                               #
  //                             </th>
  //                             <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
  //                               Name
  //                             </th>
  //                             <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
  //                               Description
  //                             </th>
  //                             <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
  //                               Owner
  //                             </th>
  //                             <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
  //                               Action
  //                             </th>
  //                           </tr>
  //                         </thead>
  //                         <tbody>
  //                           {
  //                             data && data.map((item, index) => {
  //                               return (
  //                                 <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={index}>
  //                                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
  //                                   <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  //                                     {item.name}
  //                                   </td>
  //                                   <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  //                                     {item.description}
  //                                   </td>
  //                                   <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  //                                     {item.owner}
  //                                   </td>
  //                                   <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap gap-1">
  //                                     <span className='mx-2'>
  //                                       <Button
  //                                         onClick={() => navigate('/edit/' + item.id)}
  //                                         color='success'
  //                                         className='cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105'
  //                                       >
  //                                         Edit
  //                                       </Button>
  //                                     </span>
  //                                     <span>
  //                                       <Button
  //                                         onClick={() => handleDelete(item.id)}
  //                                         color='danger'
  //                                         className='cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105'
  //                                       >
  //                                         Delete
  //                                       </Button>
  //                                     </span>
  //                                   </td>
  //                                 </tr>
  //                               )
  //                             }
  //                             )
  //                           }
  //                         </tbody>
  //                       </table>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="flex justify-center mb-3">
  //                 paginate
  //               </div>
  //             </div>
  //           </div>
  //       }
  //     </div>

  //   </Wrapper>
  // )
  return (
    <>
      <Wrapper>
        <Header title="Project List" />
        <div className="add flex justify-end my-7">
          <Button
            type="button"
            color="primary"
            className='cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105'
            onClick={() => navigate('/create')}
          >
            Add Project
          </Button>

        </div>
        <Pagination items={data} deletedItem={deleted} itemperpage={itemperpage} />

      </Wrapper>
    </>
  )
}

export default Home