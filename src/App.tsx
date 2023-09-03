import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { Home } from './components/pages/Home'
import { SignUp } from './components/pages/SignUp'
import { Login } from './components/pages/Login'
import { Confirm } from './components/pages/Confirm'
import { Error } from './components/pages/Error'
import { PrivateRoute } from './components/pages/PrivateRoute'
import { AppDispatch, RootState } from './redux/store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

const homeUrl = process.env.PUBLIC_URL

const App: React.FC = () => {
  const isLogined = useAppSelector((state) => state.user.isLogined)
  return (
    <Router>
      <Routes>
        {/* public route */}
        <Route path={homeUrl + '/registration'} element={<SignUp />} />
        <Route path={homeUrl + '/login'} element={<Login />} />
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
