import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './components/pages/Home'
import { Error } from './components/pages/Error'

const homeUrl = process.env.PUBLIC_URL

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={homeUrl} element={<Home />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
