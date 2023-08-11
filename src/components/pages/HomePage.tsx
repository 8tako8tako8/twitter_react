import { FC } from 'react'
import { SideBar } from '../templates/SideBar'
import { TimeLine } from '../templates/TimeLine'
import styled from 'styled-components'

export const HomePage: FC = () => {
  return (
    <StyledHomePage>
      <div className="homePage">
        <div className="sideBar">
          <SideBar />
        </div>
        <div className="timeLine">
          <TimeLine />
        </div>
      </div>
    </StyledHomePage>
  )
}

const StyledHomePage = styled.div`
  .homePage {
    display: flex;
    height: 100vh;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 10px;
  }

  .sideBar {
    border-right: 1px solid var(--twitter-background);
    min-width: 250px;
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .timeLine {
    min-width: 700px;
    border-right: 1px solid var(--twitter-background);
    overflow-y: scroll;
  }

  .timeLine::-webkit-scrollbar {
    display: none;
  }
`
