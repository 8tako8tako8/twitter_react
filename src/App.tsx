import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage } from './components/pages/HomePage'
import './App.css'
import styled from 'styled-components'

function App() {
  return (
    <StyledApp>
      <div className="app">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </div>
    </StyledApp>
  )
}

const StyledApp = styled.div`
  .app {
    display: flex;
    height: 100vh;
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 10px;
  }
`

export default App
