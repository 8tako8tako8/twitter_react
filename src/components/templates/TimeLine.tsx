import React from 'react'
import styled from 'styled-components'
import { TweetBox } from '../organisms/TweetBox'
import { Posts } from '../organisms/Posts'

export const TimeLine: React.FC = () => {
  return (
    <StyledTimeLine>
      <div className="timeLineHeader">
        <h2>ホーム</h2>
        <TweetBox />
      </div>
      <Posts />
    </StyledTimeLine>
  )
}

const StyledTimeLine = styled.div`
  .timeLineHeader {
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 100;
    border: 1px solid var(--twitter-background);
    padding: 5px 20px;
  }

  .timeLineHeader > h2 {
    font-size: 20px;
    font-weight: 800;
  }
`
