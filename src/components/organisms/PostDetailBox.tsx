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
import { cancelRetweet, retweet } from '../../lib/api/retweet'
import { cancelFavorite, favorite } from '../../lib/api/favorite'
import { Link } from 'react-router-dom'

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
  isRetweeted: boolean
  isFavorited: boolean
  retweets: number
  favorites: number
}

const homeUrl = process.env.PUBLIC_URL

export const PostDetailBox: React.FC = () => {
  const [post, setPost] = useState<Post>()
  const [loading, setLoading] = useState<boolean>(false)

  const { tweetId } = useParams()

  const handleGetPost = (tweetId: number) => {
    setLoading(true)

    getPost(tweetId)
      .then((res) => {
        if (res && res.data) {
          const resPost: Post = {
            id: res.data.id,
            user: res.data.user,
            tweet: res.data.tweet,
            imageUrl: res.data.imageUrl,
            isRetweeted: res.data.isRetweeted,
            isFavorited: res.data.isFavorited,
            retweets: res.data.retweets,
            favorites: res.data.favorites,
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

  const handleRetweet = () => {
    if (!post) return

    retweet(post.id)
      .then((res) => {
        if (res.status != 200) throw new Error('リツイートに失敗しました')

        setPost({ ...post, isRetweeted: true, retweets: post.retweets + 1 })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleCancelRetweet = () => {
    if (!post) return

    cancelRetweet(post.id)
      .then((res) => {
        if (res.status != 200) throw new Error('リツイート解除に失敗しました')

        setPost({ ...post, isRetweeted: false, retweets: post.retweets - 1 })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleFavorite = () => {
    if (!post) return

    favorite(post.id)
      .then((res) => {
        if (res.status != 200) throw new Error('リツイートに失敗しました')

        setPost({ ...post, isFavorited: true, favorites: post.favorites + 1 })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleCancelFavorite = () => {
    if (!post) return

    cancelFavorite(post.id)
      .then((res) => {
        if (res.status != 200) throw new Error('リツイート解除に失敗しました')

        setPost({ ...post, isFavorited: false, favorites: post.favorites - 1 })
      })
      .catch((err) => {
        console.error(err)
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
            <ProfileLink to={`${homeUrl}/users/${post?.user.id}`}>
              <div className="postHeaderText">
                <h3>
                  {post?.user.nickname}
                  <span className="postHeaderSpecial">
                    <VerifiedUser className="postBadge" />
                    {post?.user.name}
                  </span>
                </h3>
              </div>
            </ProfileLink>
            <div className="postHeaderDescription">
              <p>{post?.tweet}</p>
            </div>
          </div>
          {post?.imageUrl && <img src={post?.imageUrl} />}
          <div className="postReaction">
            <span>{post?.retweets} 件のリツイート</span>
            <span>{post?.favorites} 件のいいね</span>
          </div>
          <div className="postFooter">
            <ChatBubbleOutline fontSize="small" />
            {post?.isRetweeted && (
              <RetweetIcon
                fontSize="small"
                color="primary"
                onClick={handleCancelRetweet}
              />
            )}
            {!post?.isRetweeted && (
              <RetweetIcon fontSize="small" onClick={handleRetweet} />
            )}
            {post?.isFavorited && (
              <FavoriteIcon
                fontSize="small"
                color="error"
                onClick={handleCancelFavorite}
              />
            )}
            {!post?.isFavorited && (
              <FavoriteIcon fontSize="small" onClick={handleFavorite} />
            )}
            {/* <FavoriteBorder fontSize="small" /> */}
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

const ProfileLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const RetweetIcon = styled(Repeat)`
  cursor: pointer;
`

const FavoriteIcon = styled(FavoriteBorder)`
  cursor: pointer;
`
