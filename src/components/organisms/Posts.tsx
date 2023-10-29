import React from 'react'
import styled from 'styled-components'
import { Post } from './Post'
import { Loading } from '../pages/Loading'
import { Pagination } from '@mui/material'

type Post = {
  id: number
  user: {
    id: string
    name: string
    nickname: string
    avatarImageUrl: string
  }
  tweet: string
  imageUrl: string
  isRetweeted: boolean
  isFavorited: boolean
  isBookmarked: boolean
  retweets: number
  favorites: number
}

type Props = {
  posts: Post[]
  loading: boolean
  currentPage: number
  totalPages: number
  handleChangePage: (_event: React.ChangeEvent<unknown>, page: number) => void
}

export const Posts: React.FC<Props> = ({
  posts,
  loading,
  currentPage,
  totalPages,
  handleChangePage,
}) => {
  if (loading) {
    return <Loading />
  }

  return (
    <StyledPost>
      {posts.map((post) => (
        <Post key={post.id} post={post} myself={false} />
      ))}
      <div className="pagination">
        <Pagination
          count={totalPages}
          page={currentPage}
          variant="outlined"
          color="primary"
          size="small"
          onChange={handleChangePage}
        />
      </div>
    </StyledPost>
  )
}

const StyledPost = styled.div`
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`
