import {
  ChatBubbleOutline,
  FavoriteBorder,
  MoreVert,
  Repeat,
  VerifiedUser,
} from '@mui/icons-material'
import {
  Alert,
  Avatar,
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Snackbar,
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { deletePost } from '../../lib/api/tweet'

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
  post: Post
  myself: boolean
}

const homeUrl = process.env.PUBLIC_URL

export const Post: React.FC<Props> = ({ post, myself }) => {
  const [openMenu, setOpenMenu] = useState(false)
  const [openSuccessMessage, setOpenSuccessMessage] = useState(false)
  const [openErrorMessage, setOpenErrorMessage] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)

  const isDeleteable = true

  const handleToggle = () => {
    setOpenMenu((prevOpen) => !prevOpen)
  }

  const handleCloseMenu = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpenMenu(false)
  }

  const handleCloseSuccessMessage = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSuccessMessage(false)
  }

  const handleCloseErrorMessage = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenErrorMessage(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpenMenu(false)
    } else if (event.key === 'Escape') {
      setOpenMenu(false)
    }
  }

  const handleDeletePost = () => {
    deletePost(post.id)
      .then((res) => {
        if (res.status != 200) throw new Error('ツイート削除に失敗しました')

        setOpenSuccessMessage(true)
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
      {myself && (
        <>
          <Snackbar
            open={openSuccessMessage}
            autoHideDuration={6000}
            onClose={handleCloseSuccessMessage}
          >
            <Alert
              onClose={handleCloseSuccessMessage}
              severity="success"
              sx={{ width: '100%' }}
            >
              ツイートを削除しました
            </Alert>
          </Snackbar>
          <Snackbar
            open={openErrorMessage}
            autoHideDuration={6000}
            onClose={handleCloseErrorMessage}
          >
            <Alert
              onClose={handleCloseErrorMessage}
              severity="error"
              sx={{ width: '100%' }}
            >
              ツイートの削除に失敗しました
            </Alert>
          </Snackbar>
        </>
      )}
      <div className="post">
        <div className="postAvatar">
          <Avatar />
        </div>
        <div className="postBody">
          <div className="postHeader">
            <div className="postHeaderText">
              <PostHeaderText>
                <h3>
                  {post.user.nickname}
                  <span className="postHeaderSpecial">
                    <VerifiedUser className="postBadge" />
                    {post.user.name}
                  </span>
                </h3>
                {isDeleteable && (
                  <div>
                    <Button
                      ref={anchorRef}
                      id="composition-button"
                      aria-controls={openMenu ? 'composition-menu' : undefined}
                      aria-expanded={openMenu ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleToggle}
                    >
                      <MoreVert />
                    </Button>
                    <Popper
                      open={openMenu}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      placement="bottom-start"
                      transition
                      disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin:
                              placement === 'bottom-start'
                                ? 'left top'
                                : 'left bottom',
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleCloseMenu}>
                              <MenuList
                                autoFocusItem={openMenu}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                                onKeyDown={handleListKeyDown}
                              >
                                <MenuItem onClick={handleDeletePost}>
                                  ツイートを削除する
                                </MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </div>
                )}
              </PostHeaderText>
            </div>
            <Link to={`${homeUrl}/tweets/${post.id}`} className="postLink">
              <div className="postHeaderDescription">
                <p>{post.tweet}</p>
              </div>
            </Link>
          </div>
          {post.imageUrl && <img src={post.imageUrl} />}
          <div className="postFooter">
            <ChatBubbleOutline fontSize="small" />
            <Repeat fontSize="small" />
            <FavoriteBorder fontSize="small" />
          </div>
        </div>
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

  .postLink {
    text-decoration: none;
    color: inherit;
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

const PostHeaderText = styled.div`
  display: flex;
  justify-content: space-between;

  h3 {
    font-size: 15px;
    margin-bottom: 5px;
  }
`
