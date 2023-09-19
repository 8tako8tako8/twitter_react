import {
  ChatBubbleOutline,
  FavoriteBorder,
  Repeat,
  VerifiedUser,
} from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { getPost } from '../../lib/api/tweet'
import { useParams } from 'react-router-dom'
import { Loading } from '../pages/Loading'

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

// TODO: リツイート、いいね機能、アバター画像追加後に削除する
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

export const PostDetailBox: React.FC = () => {
  const [post, setPost] = useState<Post>(initialPost)
  const [loading, setLoading] = useState<boolean>(false)

  const { tweetId } = useParams()

  const handleGetPost = (tweetId: number) => {
    setLoading(true)

    getPost(tweetId)
      .then((res) => {
        if (res && res.data) {
          const resPost: Post = {
            ...initialPost,
            id: res.data.id,
            user: res.data.user,
            tweet: res.data.tweet,
            imageUrl: res.data.imageUrl,
          }
          setPost(resPost)
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
    handleGetPost(Number(tweetId))
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <StyledPostDetailBox>
      <div className="post">
        <div className="postAvatar">
          <Avatar />
        </div>
        <div className="postBody">
          <div className="postHeader">
            <div className="postHeaderText">
              <h3>
                {post.user.nickname}
                <span className="postHeaderSpecial">
                  <VerifiedUser className="postBadge" />
                  {post.user.name}
                </span>
              </h3>
            </div>
            <div className="postHeaderDescription">
              <p>ツイート内容</p>
            </div>
          </div>
          {post.imageUrl && <img src={post.imageUrl} />}
          <div className="postReaction">
            <span>{post.retweets} 件のリツイート</span>
            <span>{post.likes} 件のいいね</span>
          </div>
          <div className="postFooter">
            <ChatBubbleOutline fontSize="small" />
            <Repeat fontSize="small" />
            <FavoriteBorder fontSize="small" />
          </div>
        </div>
      </div>
    </StyledPostDetailBox>
  )
}

const StyledPostDetailBox = styled.div`
  .PostDetailBox {
    padding-bottom: 10px;
    padding-right: 10px;
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  .post {
    display: flex;
    align-items: flex-start;
    border-bottom: 1px solid var(--twitter-background);
  }

  .postBody {
    flex: 1;
    min-width: 0;
  }

  p {
    margin: 0;
    padding: 0;
  }

  .postBody > img {
    border-radius: 20px;
    width: 100%;
  }

  .postReaction {
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .postReaction > span {
    margin-right: 20px;
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
    white-space: normal;
    word-wrap: break-word;
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
`
