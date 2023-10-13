import {
  ChatBubbleOutline,
  FavoriteBorder,
  Repeat,
  VerifiedUser,
} from '@mui/icons-material'
import { Avatar, MenuItem } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { deletePost } from '../../lib/api/tweet'
import { FlashMessage } from './FlashMessage'
import { DropDownMenu } from './DropDownMenu'

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
        <PostCardAvatar>
          <Avatar />
        </PostCardAvatar>
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
            <Repeat fontSize="small" />
            <FavoriteBorder fontSize="small" />
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

const PostCardAvatar = styled.div`
  padding: 15px;
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
