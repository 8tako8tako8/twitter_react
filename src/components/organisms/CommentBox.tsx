import { Avatar, Button } from '@mui/material'
import React, { useState } from 'react'
import { styled } from 'styled-components'
import { postComment } from '../../lib/api/comment'
import { useParams } from 'react-router-dom'

export const CommentBox: React.FC = () => {
  const [commentMessage, setCommentMessage] = useState('')

  const { tweetId } = useParams()

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault()

    postComment(commentMessage, Number(tweetId))
      .then((res) => {
        if (res.status != 201) throw new Error('コメント投稿に失敗しました')

        setCommentMessage('')
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <StyledCommentBox>
      <div className="commentBox">
        <form onSubmit={handleSendComment}>
          <div className="commentBoxInput">
            <Avatar />
            <textarea
              value={commentMessage}
              placeholder="コメントを投稿"
              onChange={(e) => setCommentMessage(e.target.value)}
            />
          </div>
          <Button className="commentBoxButton" type="submit">
            コメント
          </Button>
        </form>
      </div>
    </StyledCommentBox>
  )
}

const StyledCommentBox = styled.div`
  .commentBox {
    padding-bottom: 10px;
    padding-right: 10px;
    border-bottom: 1px solid var(--twitter-background);
  }

  .commentBox > form {
    display: flex;
    justify-content: space-between;
  }

  .commentBoxInput {
    padding: 20px;
    display: flex;
    width: 80%;
  }

  .commentBoxInput > textarea {
    flex: 1;
    font-size: 20px;
    margin-left: 20px;
    border: none;
    resize: none;
    overflow: auto;
    min-width: 0;
  }

  .commentBoxButton {
    background-color: var(--twitter-color) !important;
    color: white !important;
    font-weight: 900 !important;
    width: 80px !important;
    height: 40px !important;
    border-radius: 30px !important;
    margin-left: auto !important;
    margin-top: 20px !important;
  }
`
