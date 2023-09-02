import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './components/pages/Home'
import { SignUp } from './components/pages/SignUp'
import { SignIn } from './components/pages/SignIn'
import { Confirm } from './components/pages/Confirm'
import { Error } from './components/pages/Error'
import { PrivateRoute } from './components/pages/PrivateRoute'

const homeUrl = process.env.PUBLIC_URL

const App: React.FC = () => {
  const isLogined = false
  return (
    <Router>
      <Routes>
        {/* public route */}
        <Route path={homeUrl + '/registration'} element={<SignUp />} />
        <Route path={homeUrl + '/login'} element={<SignIn />} />
        <Route path={homeUrl + '/confirm'} element={<Confirm />} />

        {/* private route */}
        <Route
          path={homeUrl}
          element={<PrivateRoute isLogined={isLogined} children={<Home />} />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
