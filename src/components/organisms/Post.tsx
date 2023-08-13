import {
  ChatBubbleOutline,
  FavoriteBorder,
  Repeat,
  VerifiedUser,
} from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { FC } from 'react'
import styled from 'styled-components'

type Tweet = {
  id: number
  user: {
    id: string
    userName: string
    displayName: string
    avatarUrl: string
  }
  content: string
  image: string
  retweets: number
  likes: number
}

type Props = {
  tweet: Tweet
}

export const Post: FC<Props> = (props) => {
  const { tweet } = props

  return (
    <StyledPost>
      <div className="post">
        <div className="postAvatar">
          <Avatar />
        </div>
        <div className="postBody">
          <div className="postHeader">
            <div className="postHeaderText">
              <h3>
                {tweet.user.displayName}
                <span className="postHeaderSpecial">
                  <VerifiedUser className="postBadge" />
                  {tweet.user.userName}
                </span>
              </h3>
            </div>
            <div className="postHeaderDescription">
              <p>{tweet.content}</p>
            </div>
          </div>
          {tweet.image && <img src={tweet.image} />}
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
`
