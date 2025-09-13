// rafce
import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './utils/ScrollToTop';

const App = () => {
  // javascrpit

  return (
    <>
      <ToastContainer />
      <AppRoutes />
    </>
  )
}

export default App