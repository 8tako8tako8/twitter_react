import { Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import { styled } from 'styled-components'
import { Post } from './Post'

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
}

export const VariousPosts: React.FC<Props> = ({ posts }) => {
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
        posts.map((post) => <Post key={post.id} post={post} />)}
    </StyledVariousPosts>
  )
}

const StyledVariousPosts = styled.div``
