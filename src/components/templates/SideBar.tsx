import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Button } from '@mui/material'

import styled from 'styled-components'
import { SideBarOptionList } from '../organisms/SideBarOptionList'

export const SideBar: React.FC = () => {
  return (
    <StyledSideBar>
      <TwitterIcon className="sideBarTwitterIcon" />
      <SideBarOptionList />
      <Button variant="outlined" className="sideBarTweet" fullWidth>
        ツイートする
      </Button>
    </StyledSideBar>
  )
}

const StyledSideBar = styled.div`
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
