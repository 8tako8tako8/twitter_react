import React from 'react'
import { styled } from 'styled-components'
import { SideBar } from '../templates/SideBar'
import { BookmarkPosts } from '../organisms/BookmarkPosts'

export const Bookmark: React.FC = () => {
  return (
    <StyledHome>
      <SideBarBlock>
        <SideBar />
      </SideBarBlock>
      <BookmarkPostsBlock>
        <BookmarkPosts></BookmarkPosts>
      </BookmarkPostsBlock>
    </StyledHome>
  )
}

const StyledHome = styled.div`
  display: flex;
  height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 10px;
`

const SideBarBlock = styled.div`
  border-right: 1px solid var(--twitter-background);
  min-width: 300px;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
`

const BookmarkPostsBlock = styled.div`
  min-width: 700px;
  border-right: 1px solid var(--twitter-background);
  overflow-y: scroll;
`
