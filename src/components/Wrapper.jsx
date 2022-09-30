import React from 'react'

const Wrapper = ({ children }) => {
  return (
    <>
      <main className="flex flex-row mx-auto">
        <div className="w-full mx-auto py-5 mx-44">
          {children}
        </div>
      </main>
    </>
  )
}

export default Wrapper