import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TweetBox } from '../organisms/TweetBox'
import { Posts } from '../organisms/Posts'
import { getPosts } from '../../lib/api/tweet'
import { useNavigate } from 'react-router-dom'

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
  retweets: number
  favorites: number
}

// TODO: リツイート、いいね機能、アバター画像後に削除する
const initialPost: Post = {
  id: 1,
  user: {
    id: 'u1',
    name: 'aliiiiii1',
    nickname: 'Alice',
    avatarImageUrl: '/path/to/avatar1.png',
  },
  tweet: 'This is a sample tweet from Alice.',
  imageUrl: 'https://source.unsplash.com/random',
  isRetweeted: false,
  isFavorited: false,
  retweets: 5,
  favorites: 20,
}

export const TimeLine: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [totalPages, setTotalPages] = React.useState(1)

  const navigate = useNavigate()

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page)
    navigate({ ...location, search: `?page=${page}` })
    handleGetPosts(page)
  }

  const handleGetPosts = (page: number) => {
    setLoading(true)

    getPosts(page)
      .then((res) => {
        if (res && res.data) {
          setTotalPages((res.data.pagination.totalPages as number) || 1)
          const resPosts: Post[] = (res.data.tweets as Post[]).map((tweet) => {
            return {
              ...initialPost,
              id: tweet.id,
              user: tweet.user,
              tweet: tweet.tweet,
              imageUrl: tweet.imageUrl,
              isRetweeted: tweet.isRetweeted,
              isFavorited: tweet.isFavorited,
              retweets: tweet.retweets,
              favorites: tweet.favorites,
            }
          })
          setPosts(resPosts)
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

  return (
    <StyledTimeLine>
      <div className="timeLineHeader">
        <h2>ホーム</h2>
        <TweetBox handleGetPosts={handleGetPosts} />
      </div>
      <Posts
        posts={posts}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        handleChangePage={handleChangePage}
      />
    </StyledTimeLine>
  )
}

const StyledTimeLine = styled.div`
  .timeLineHeader {
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 100;
    border: 1px solid var(--twitter-background);
    padding: 5px 20px;
  }

  .timeLineHeader > h2 {
    font-size: 20px;
    font-weight: 800;
  }
`
