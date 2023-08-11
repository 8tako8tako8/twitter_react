import { FC } from 'react'
import { SideBar } from '../templates/SideBar'
import styled from 'styled-components'

export const HomePage: FC = () => {
  return (
    <StyledHomePage className="homePage">
      <div className="homePage">
        <SideBar />
      </div>
    </StyledHomePage>
  )
}

const StyledHomePage = styled.div`
  .homePage {
    display: flex;
    height: 100vh;
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 10px;
  }
`
