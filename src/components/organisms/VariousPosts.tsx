import { Pagination, Tab, Tabs } from '@mui/material'
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

const initialPosts: Post[] = [
  {
    id: 1,
    user: {
      id: 'u1',
      name: 'aliiiiii1',
      nickname: 'Alice',
      avatarUrl: '/path/to/avatar1.png',
    },
    tweet: 'This is a sample tweet from Alice.',
    imageUrl: 'https://source.unsplash.com/random',
    retweets: 5,
    likes: 20,
  },
  {
    id: 2,
    user: {
      id: 'u1',
      name: 'aliiiiii1',
      nickname: 'Alice',
      avatarUrl: '/path/to/avatar1.png',
    },
    tweet: 'This is a sample tweet from Alice.',
    imageUrl: 'https://source.unsplash.com/random',
    retweets: 5,
    likes: 20,
  },
]

export const VariousPosts: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState(1)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalPages, setTotalPages] = useState(1)
  const [currentTabIndex, setCurrentTabIndex] = useState(0)

  const handleChangePage = () => {}

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
      {currentTabIndex === 1 &&
        posts.map((post) => <Post key={post.id} post={post} />)}
      {currentTabIndex === 2 &&
        posts.map((post) => <Post key={post.id} post={post} />)}
      {currentTabIndex === 3 &&
        posts.map((post) => <Post key={post.id} post={post} />)}
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
    </StyledVariousPosts>
  )
}

const StyledVariousPosts = styled.div`
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`
