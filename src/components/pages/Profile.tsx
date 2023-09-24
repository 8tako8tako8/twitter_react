import React from 'react'
import { styled } from 'styled-components'
import { SideBar } from '../templates/SideBar'
import { ProfileDetail } from '../organisms/ProfileDetail'
import { VariousPosts } from '../organisms/VariousPosts'

export const Profile: React.FC = () => {
  return (
    <StyledHome>
      <div className="sideBar">
        <SideBar />
      </div>
      <div className="profile">
        <ProfileDetail />
        <VariousPosts />
      </div>
    </StyledHome>
  )
}

const StyledHome = styled.div`
  display: flex;
  height: 100vh;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 10px;

  .sideBar {
    border-right: 1px solid var(--twitter-background);
    min-width: 300px;
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .profile {
    min-width: 600px;
    border-right: 1px solid var(--twitter-background);
    overflow-y: scroll;
  }

  .post::-webkit-scrollbar {
    display: none;
  }
`
