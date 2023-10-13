import { VerifiedUser } from '@mui/icons-material'
import React from 'react'
import { styled } from 'styled-components'

type Comment = {
  id: number
  user: {
    id: string
    name: string
    nickname: string
    avatarImageUrl: string
  }
  comment: string
}

type Props = {
  comment: Comment
}

export const Comment: React.FC<Props> = ({ comment }) => {
  return (
    <StyledComment>
      <div className="comment">
        <AvatarImageBlock>
          {comment.user.avatarImageUrl ? (
            <AvatarImage src={comment.user.avatarImageUrl} />
          ) : (
            <AvatarImage src={`${process.env.PUBLIC_URL}/no_image.png`} />
          )}
        </AvatarImageBlock>
        <div className="commentBody">
          <div className="commentHeader">
            <div className="commentHeaderText">
              <h3>
                {comment.user.nickname}
                <span className="commentHeaderSpecial">
                  <VerifiedUser className="commentBadge" />
                  {comment.user.name}
                </span>
              </h3>
            </div>
            <div className="commentHeaderDescription">
              <p>{comment.comment}</p>
            </div>
          </div>
        </div>
      </div>
    </StyledComment>
  )
}

const StyledComment = styled.div`
  .comment {
    display: flex;
    align-items: flex-start;
    border-bottom: 1px solid var(--twitter-background);
  }

  .commentBody {
    flex: 1;
    min-width: 0;
  }

  p {
    margin: 0;
    padding: 0;
  }

  .commentBody > img {
    border-radius: 20px;
    width: 100%;
  }

  .commentHeaderDescription {
    margin-bottom: 10px;
    font-size: 15px;
    white-space: normal;
    word-wrap: break-word;
  }

  .commentHeaderText > h3 {
    font-size: 15px;
    margin-bottom: 5px;
  }

  .commentBadge {
    font-size: 14px !important;
    color: var(--twitter-color);
  }

  .commentHeaderSpecial {
    font-weight: 600;
    font-size: 12px;
    color: gray;
  }
`

const AvatarImageBlock = styled.div`
  padding: 15px;
`

const AvatarImage = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`
