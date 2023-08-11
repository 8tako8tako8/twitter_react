import { FC } from 'react'

import styled from 'styled-components'
import { SideBarOptionList } from '../organisms/SideBarOptionList'

export const SideBar: FC = () => {
  return (
    <StyledSideBar>
      <div className="sideBar">
        <SideBarOptionList />
      </div>
    </StyledSideBar>
  )
}

const StyledSideBar = styled.div`
  .sideBar {
    border-right: 1px solid var(--twitter-background);
    flex: 0.2;
    min-width: 250px;
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .sideBarTwitterIcon {
    color: var(--twitter-color);
    font-size: 30px !important;
    margin-left: 20px;
    margin-bottom: 20px;
  }

  .sideBarTweet {
    background-color: var(--twitter-color) !important;
    color: white !important;
    font-weight: 900 !important;
    border: none !important;
    border-radius: 30px !important;
    height: 50px !important;
    margin-top: 20px !important;
  }
`
