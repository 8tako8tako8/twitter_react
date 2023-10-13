import React from 'react'
import { styled } from 'styled-components'
import { Comment } from './Comment'
import { Pagination } from '@mui/material'

type Comment = {
  id: number
  user: {
    id: string
    name: string
    nickname: string
    avatarImageUrl: string
  }
  comment: string
  imageUrl: string
}

const initialComments: Comment[] = [
  {
    id: 1,
    user: {
      id: '1',
      name: '山田太郎',
      nickname: 'taro',
      avatarImageUrl: 'https://source.unsplash.com/random',
    },
    comment: 'コメント1',
    imageUrl: 'https://source.unsplash.com/random',
  },
  {
    id: 2,
    user: {
      id: '2',
      name: '山田二郎',
      nickname: 'jiro',
      avatarImageUrl: 'https://source.unsplash.com/random',
    },
    comment: 'コメント2',
    imageUrl: 'https://source.unsplash.com/random',
  },
]

export const Comments: React.FC = () => {
  const [comments] = React.useState<Comment[]>(initialComments)

  const totalPages = 1
  const currentPage = 1

  return (
    <StyledComments>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      <div className="pagination">
        <Pagination
          count={totalPages}
          page={currentPage}
          variant="outlined"
          color="primary"
          size="small"
        />
      </div>
    </StyledComments>
  )
}

const StyledComments = styled.div`
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`
