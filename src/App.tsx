import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import './App.css'
import { Home } from './components/pages/Home'
import { SignUp } from './components/pages/SignUp'
import { Login } from './components/pages/Login'
import { Confirm } from './components/pages/Confirm'
import { Error } from './components/pages/Error'
import { PrivateRoute } from './components/pages/PrivateRoute'
import { AppDispatch, RootState } from './redux/store'
import { getCurrentUser } from './lib/api/auth'
import { setCurrentUser } from './redux/userSlice'
import { Loading } from './components/pages/Loading'
import { PostDetail } from './components/pages/PostDetail'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

const homeUrl = process.env.PUBLIC_URL

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = React.useState<boolean>(true)

  const handleGetCurrentUser = async () => {
    setLoading(true)
    try {
      const res = await getCurrentUser()
      if (res && res.data) {
        const { email, name, nickname, image } = res.data
        dispatch(setCurrentUser({ email, name, nickname, image }))
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void handleGetCurrentUser()
  }, [dispatch])

  if (loading) {
    return <Loading />
  }

  return (
    <Router>
      <Routes>
        {/* public route */}
        <Route path={homeUrl + '/registration'} element={<SignUp />} />
        <Route path={homeUrl + '/login'} element={<Login />} />
        <Route path={homeUrl + '/confirm'} element={<Confirm />} />

        {/* private route */}
        <Route path={homeUrl} element={<PrivateRoute children={<Home />} />} />
        <Route
          path={homeUrl + '/tweets/:id'}
          element={<PrivateRoute children={<PostDetail />} />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
