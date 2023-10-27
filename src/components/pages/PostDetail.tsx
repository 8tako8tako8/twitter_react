import React from 'react'
import { styled } from 'styled-components'
import { SideBar } from '../templates/SideBar'
import { PostDetailBox } from '../organisms/PostDetailBox'
import { CommentBox } from '../organisms/CommentBox'
import { Comments } from '../organisms/Comments'

export const PostDetail: React.FC = () => {
  return (
    <StyledPostDetail>
      <div className="sideBar">
        <SideBar />
      </div>
      <div className="post">
        <PostDetailBox />
        <CommentBox />
        <Comments />
      </div>
    </StyledPostDetail>
  )
}

const StyledPostDetail = styled.div`
  display: flex;
  height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 10px;

  .sideBar {
    border-right: 1px solid var(--twitter-background);
    min-width: 300px;
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .post {
    min-width: 700px;
    border-right: 1px solid var(--twitter-background);
    overflow-y: scroll;
  }

  .post::-webkit-scrollbar {
    display: none;
  }
`
