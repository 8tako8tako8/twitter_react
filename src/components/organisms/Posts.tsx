import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Post } from './Post'
import { getPosts } from '../../lib/api/tweet'
import { Loading } from '../pages/Loading'
import { Pagination } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

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

// TODO: リツイート、いいね機能、アバター画像後に削除する
const initialPost: Post = {
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
}

export const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [totalPages, setTotalPages] = React.useState(1)

  const navigate = useNavigate()
  const location = useLocation()

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page)
    navigate({ ...location, search: `?page=${page}` })
    handleGetPosts(page)
    window.scrollTo(0, 0)
  }

  const handleGetPosts = (page: number) => {
    setLoading(true)

    getPosts(page)
      .then((res) => {
        if (res && res.data) {
          setTotalPages((res.data.pagination.totalPages as number) || 1)
          const tmpPosts: Post[] = (res.data.tweets as Post[]).map((tweet) => {
            return {
              ...initialPost,
              id: tweet.id,
              user: tweet.user,
              tweet: tweet.tweet,
              imageUrl: tweet.imageUrl,
              retweets: tweet.retweets,
              likes: tweet.likes,
            }
          })
          setPosts(tmpPosts)
        }
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    //  クエリパラメータからpageを取得する
    const queryParams = new URLSearchParams(location.search)
    const page = Number(queryParams.get('page')) || 1
    setCurrentPage(page)
    handleGetPosts(page)
  }, [location.search])

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
