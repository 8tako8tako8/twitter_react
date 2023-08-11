import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage } from './components/pages/HomePage'
import './App.css'

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
