import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Pages/Home'
import Error from './Pages/Error'
import Option from './Pages/Option'
import Game from "./Pages/Game";



const router = createBrowserRouter([
  {
    path : "/",
    element : <Home/>,
    errorElement:<Error/>
  },
  {
    path : "/game",
    element : <Game/>
  },
  {
    path:"/option",
    element:<Option/>
  }

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)