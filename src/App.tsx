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
import { Profile } from './components/pages/Profile'
import { Notice } from './components/pages/Notice'
import { DirectMessage } from './components/pages/DirectMessage'
import { Bookmark } from './components/pages/Bookmark'
import { Withdrawal } from './components/pages/Withdrawal'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = React.useState<boolean>(true)

  const handleGetCurrentUser = async () => {
    setLoading(true)
    try {
      const res = await getCurrentUser()
      if (res && res.data) {
        const { email, name, nickname, avatarImageUrl, id } = res.data
        dispatch(setCurrentUser({ email, name, nickname, avatarImageUrl, id }))
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
        <Route path={'/registration'} element={<SignUp />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/confirm'} element={<Confirm />} />

        {/* private route */}
        <Route path={'/'} element={<PrivateRoute children={<Home />} />} />
        <Route
          path={'/tweets/:tweetId'}
          element={<PrivateRoute children={<PostDetail />} />}
        />
        <Route
          path={'/users/:userId'}
          element={<PrivateRoute children={<Profile />} />}
        />
        <Route
          path={'/notifications'}
          element={<PrivateRoute children={<Notice />} />}
        />
        <Route
          path={'/messages'}
          element={<PrivateRoute children={<DirectMessage />} />}
        />
        <Route
          path={'/bookmarks'}
          element={<PrivateRoute children={<Bookmark />} />}
        />
        <Route
          path={'/withdrawal'}
          element={<PrivateRoute children={<Withdrawal />} />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
