import { useState } from 'react'
// import { createBrowserHistory } from "history";
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from './views/Login'
import Home from './views/Home'
import NotFound from './views/NotFound'
import Create from './views/Create';
import Edit from './views/Edit';

const PrivateRoute = ({ children, ...rest }) => {
  // auth
  return !!localStorage.getItem("access_token") ? children : <Navigate to="/login" />
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path={"/"}
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path={"/create"}
          element={
            <PrivateRoute>
              <Create />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path={"/edit/:id"}
          element={
            <PrivateRoute>
              <Edit />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
