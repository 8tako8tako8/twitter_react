import { Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import { styled } from 'styled-components'
import { Post } from './Post'
import { Comment } from './Comment'

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
  retweets: number
  likes: number
}

type Comment = {
  id: number
  user: {
    id: string
    name: string
    nickname: string
    avatarImageUrl: string
  }
  tweetId: number
  comment: string
}

type Props = {
  posts: Post[]
  comments: Comment[]
  myself: boolean
  handleGetProfile: (userId: number) => void
}

export const VariousPosts: React.FC<Props> = ({
  posts,
  comments,
  myself,
  handleGetProfile,
}) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0)

  const handleTabChange = (_event: React.SyntheticEvent, tabIndex: number) => {
    setCurrentTabIndex(tabIndex)
  }

  return (
    <StyledVariousPosts>
      <Tabs
        value={currentTabIndex}
        onChange={handleTabChange}
        variant="fullWidth"
      >
        <Tab label="ツイート" />
        <Tab label="コメント" />
        <Tab label="リツイート" />
        <Tab label="いいね" />
      </Tabs>
      {currentTabIndex === 0 &&
        posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            myself={myself}
            handleGetProfile={handleGetProfile}
          />
        ))}
      {currentTabIndex === 1 &&
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
    </StyledVariousPosts>
  )
}

const StyledVariousPosts = styled.div``
