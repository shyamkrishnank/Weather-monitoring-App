import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthRoute from './components/auth/AuthRoute'
import Init from './components/pages/InitialPages/Init'
import LandingPage from './components/pages/InitialPages/Landing'
import LoginPage from './components/pages/InitialPages/LoginPage'
import SignupPage from './components/pages/InitialPages/SignupPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/auth/ProtectedRoute'
import UserHome from './components/pages/UserPages/UserHome'
import UserRecords from './components/pages/UserPages/UserRecords'
import InitialContents from './components/contents/User/InitialContents'



function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path='/' element={<Init />} />
          <Route index element={<LandingPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignupPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='user' element={<InitialContents/>}>
            <Route index element={<UserHome />} />
            <Route path='records' element={<UserRecords />} />
          </Route>
        </Route>
      </Routes>
    </Router>
    <ToastContainer />
    </>
    
  )
}

export default App
