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
    avatarUrl: string
  }
  tweet: string
  imageUrl: string
  retweets: number
  likes: number
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
        <Post key={post.id} post={post} />
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
  .post {
    display: flex;
    align-items: flex-start;
    border-bottom: 1px solid var(--twitter-background);
  }

  .postBody {
    flex: 1;
  }

  p {
    margin: 0;
    padding: 0;
  }

  .postBody > img {
    border-radius: 20px;
    width: 100%;
  }

  .postFooter {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 10px;
  }

  .postHeaderDescription {
    margin-bottom: 10px;
    font-size: 15px;
  }

  .postHeaderText > h3 {
    font-size: 15px;
    margin-bottom: 5px;
  }

  .postBadge {
    font-size: 14px !important;
    color: var(--twitter-color);
  }

  .postHeaderSpecial {
    font-weight: 600;
    font-size: 12px;
    color: gray;
  }

  .postAvatar {
    padding: 15px;
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`
