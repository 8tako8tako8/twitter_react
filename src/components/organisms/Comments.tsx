import React from 'react'
import { styled } from 'styled-components'
import { Comment } from './Comment'

type Comment = {
  id: number
  user: {
    id: string
    name: string
    nickname: string
    avatarUrl: string
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
      avatarUrl: '/path/to/avatar1.png',
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
      avatarUrl: '/path/to/avatar1.png',
    },
    comment: 'コメント2',
    imageUrl: 'https://source.unsplash.com/random',
  },
]

export const Comments: React.FC = () => {
  const [comments] = React.useState<Comment[]>(initialComments)

  return (
    <StyledComments>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </StyledComments>
  )
}

const StyledComments = styled.div``
