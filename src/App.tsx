import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './components/pages/Home'
import { SignUp } from './components/pages/SignUp'
import { Confirm } from './components/pages/Confirm'
import { Error } from './components/pages/Error'

const homeUrl = process.env.PUBLIC_URL

const App: React.FC = () => {
  console.log(homeUrl)
  return (
    <Router>
      <Routes>
        <Route path={homeUrl} element={<Home />} />
        <Route path={homeUrl + '/registration'} element={<SignUp />} />
        <Route path={homeUrl + '/confirm'} element={<Confirm />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
