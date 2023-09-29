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

type Props = {
  posts: Post[]
}

export const VariousPosts: React.FC<Props> = ({ posts }) => {
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
