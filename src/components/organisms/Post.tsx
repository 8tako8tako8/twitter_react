import {
  ChatBubbleOutline,
  FavoriteBorder,
  Repeat,
  VerifiedUser,
} from '@mui/icons-material'
import { MenuItem } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { deletePost } from '../../lib/api/tweet'
import { FlashMessage } from './FlashMessage'
import { DropDownMenu } from './DropDownMenu'
import { cancelRetweet, retweet } from '../../lib/api/retweet'
import { cancelFavorite, favorite } from '../../lib/api/favorite'

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

type Props = {
  post: Post
  myself: boolean
  handleGetProfile?: (userId: number) => void
}

const homeUrl = process.env.PUBLIC_URL

export const Post: React.FC<Props> = ({ post, myself, handleGetProfile }) => {
  const [openMenu, setOpenMenu] = useState(false)
  const [openSuccessMessage, setOpenSuccessMessage] = useState(false)
  const [openErrorMessage, setOpenErrorMessage] = useState(false)
  const [isRetweeted, setIsRetweeted] = useState(post.isRetweeted)
  const [isFavorited, setIsFavorited] = useState(post.isFavorited)
  const [retweets, setRetweets] = useState(post.retweets)
  const [favorites, setFavorites] = useState(post.favorites)

  const anchorRef = useRef<HTMLButtonElement>(null)

  const handleDeletePost = () => {
    deletePost(post.id)
      .then((res) => {
        if (res.status != 200) throw new Error('ツイート削除に失敗しました')

        setOpenSuccessMessage(true)
        if (handleGetProfile) handleGetProfile(Number(post.user.id))
      })
      .catch((err) => {
        console.error(err)
        setOpenErrorMessage(true)
      })
    setOpenMenu(false)
  }

  const handleRetweet = () => {
    retweet(post.id)
      .then((res) => {
        if (res.status != 200) throw new Error('リツイートに失敗しました')

        setIsRetweeted(true)
        setRetweets((prevRetweets) => prevRetweets + 1)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleCancelRetweet = () => {
    cancelRetweet(post.id)
      .then((res) => {
        if (res.status != 200) throw new Error('リツイート解除に失敗しました')

        setIsRetweeted(false)
        setRetweets((prevRetweets) => prevRetweets - 1)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleFavorite = () => {
    favorite(post.id)
      .then((res) => {
        if (res.status != 200) throw new Error('いいねに失敗しました')

        setIsFavorited(true)
        setFavorites((prevFavorites) => prevFavorites + 1)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleCancelFavorite = () => {
    cancelFavorite(post.id)
      .then((res) => {
        if (res.status != 200) throw new Error('いいね解除に失敗しました')

        setIsFavorited(false)
        setFavorites((prevFavorites) => prevFavorites - 1)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const prevOpen = useRef(openMenu)
  useEffect(() => {
    if (prevOpen.current === true && openMenu === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = openMenu
  }, [openMenu])

  return (
    <StyledPost>
      <FlashMessage
        open={openSuccessMessage}
        setOpen={setOpenSuccessMessage}
        severity="success"
      >
        削除しました
      </FlashMessage>
      <FlashMessage
        open={openErrorMessage}
        setOpen={setOpenErrorMessage}
        severity="error"
      >
        削除に失敗しました
      </FlashMessage>
      <PostCard>
        <AvatarImageBlock>
          {post.user.avatarImageUrl ? (
            <AvatarImage src={post.user.avatarImageUrl} />
          ) : (
            <AvatarImage src={`${process.env.PUBLIC_URL}/no_image.png`} />
          )}
        </AvatarImageBlock>
        <PostCardBody>
          <PostCardBodyTop>
            <PostCardBodyTopContents>
              <PostCardHeaderName>
                {post.user.nickname}
                <VerifiedUserBadge />
                <AccountName>{post.user.name}</AccountName>
              </PostCardHeaderName>
              {myself && (
                <DropDownMenu
                  open={openMenu}
                  setOpen={setOpenMenu}
                  anchorRef={anchorRef}
                >
                  <MenuItem onClick={handleDeletePost}>
                    ツイートを削除する
                  </MenuItem>
                </DropDownMenu>
              )}
            </PostCardBodyTopContents>
            <PostLink to={`${homeUrl}/tweets/${post.id}`}>
              <PostCardBodyDescriptionBlock>
                <PostCardBodyDescription>{post.tweet}</PostCardBodyDescription>
              </PostCardBodyDescriptionBlock>
            </PostLink>
          </PostCardBodyTop>
          {post.imageUrl && <PostImage src={post.imageUrl} />}
          <PostFooter>
            <ChatBubbleOutline fontSize="small" />
            <RetweetBlock>
              {!isRetweeted && (
                <>
                  <RetweetIcon fontSize="small" onClick={handleRetweet} />
                  <RetweetCountInactive>{retweets}</RetweetCountInactive>
                </>
              )}
              {isRetweeted && (
                <>
                  <RetweetIcon
                    fontSize="small"
                    color="primary"
                    onClick={handleCancelRetweet}
                  />
                  <RetweetCountActive>{retweets}</RetweetCountActive>
                </>
              )}
            </RetweetBlock>
            <FavoriteBlock>
              {!isFavorited && (
                <>
                  <FavoriteIcon fontSize="small" onClick={handleFavorite} />
                  <FavoriteCountInactive>{favorites}</FavoriteCountInactive>
                </>
              )}
              {isFavorited && (
                <>
                  <FavoriteIcon
                    fontSize="small"
                    color="error"
                    onClick={handleCancelFavorite}
                  />
                  <FavoriteCountActive>{favorites}</FavoriteCountActive>
                </>
              )}
            </FavoriteBlock>
          </PostFooter>
        </PostCardBody>
      </PostCard>
    </StyledPost>
  )
}

const StyledPost = styled.div``

const PostCard = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid var(--twitter-background);
`

const AvatarImageBlock = styled.div`
  padding: 15px;
`

const AvatarImage = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`

const PostCardBody = styled.div`
  flex: 1;
  min-width: 0;
`

const PostLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const PostCardBodyTop = styled.div``

const PostCardBodyTopContents = styled.div`
  display: flex;
  justify-content: space-between;
`

const PostCardHeaderName = styled.h3`
  font-size: 15px;
  margin-bottom: 5px;
`

const AccountName = styled.span`
  font-weight: 600;
  font-size: 12px;
  color: gray;
`

const VerifiedUserBadge = styled(VerifiedUser)`
  font-size: 14px !important;
  color: var(--twitter-color);
`

const PostCardBodyDescriptionBlock = styled.div`
  margin-bottom: 10px;
  font-size: 15px;
  white-space: normal;
  word-wrap: break-word;
`

const PostCardBodyDescription = styled.p`
  margin: 0;
  padding: 0;
`

const PostImage = styled.img`
  border-radius: 20px;
  width: 100%;
`

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
`

const RetweetBlock = styled.div`
  display: flex;
  align-items: center;
`

const RetweetIcon = styled(Repeat)`
  cursor: pointer;
`

const RetweetCountActive = styled.span`
  margin-left: 5px;
  color: blue;
`

const RetweetCountInactive = styled.span`
  margin-left: 5px;
`

const FavoriteBlock = styled.div`
  display: flex;
  align-items: center;
`

const FavoriteIcon = styled(FavoriteBorder)`
  cursor: pointer;
`

const FavoriteCountActive = styled.span`
  margin-left: 5px;
  color: red;
`

const FavoriteCountInactive = styled.span`
  margin-left: 5px;
`
