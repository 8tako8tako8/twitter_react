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
      <CommentCard>
        <AvatarImageBlock>
          {comment.user.avatarImageUrl ? (
            <AvatarImage src={comment.user.avatarImageUrl} />
          ) : (
            <AvatarImage src={`${process.env.PUBLIC_URL}/no_image.png`} />
          )}
        </AvatarImageBlock>
        <CommentCardBody>
          <CommentCardBodyTopContents>
            <CommentCardHeaderName>
              {comment.user.nickname}
              <VerifiedUserBadge />
              <AccountName>{comment.user.name}</AccountName>
            </CommentCardHeaderName>
          </CommentCardBodyTopContents>
          <CommentCardBodyDescriptionBlock>
            <CommentCardBodyDescription>
              {comment.comment}
            </CommentCardBodyDescription>
          </CommentCardBodyDescriptionBlock>
        </CommentCardBody>
      </CommentCard>
    </StyledComment>
  )
}

const StyledComment = styled.div``

const CommentCard = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid var(--twitter-background);
`

const AvatarImage = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`

const AvatarImageBlock = styled.div`
  padding: 15px;
`

const CommentCardBody = styled.div`
  flex: 1;
  min-width: 0;
`

const CommentCardBodyTopContents = styled.div``

const CommentCardHeaderName = styled.h3`
  font-size: 15px;
  margin-bottom: 5px;
`

const VerifiedUserBadge = styled(VerifiedUser)`
  font-size: 14px !important;
  color: var(--twitter-color);
`

const AccountName = styled.span`
  font-weight: 600;
  font-size: 12px;
  color: gray;
`

const CommentCardBodyDescriptionBlock = styled.div`
  margin-bottom: 10px;
  font-size: 15px;
  white-space: normal;
  word-wrap: break-word;
`

const CommentCardBodyDescription = styled.p`
  margin: 0;
  padding: 0;
`
