import { Avatar, Button } from '@mui/material'
import React from 'react'
import { styled } from 'styled-components'

export const CommentBox: React.FC = () => {
  const [commentMessage, setCommentMessage] = React.useState('')

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault()

    // TODO: コメント投稿処理
  }

  return (
    <StyledCommentBox>
      <div className="commentBox">
        <form onSubmit={handleSendComment}>
          <div className="commentBoxInput">
            <Avatar />
            <textarea
              value={commentMessage}
              placeholder="返信をツイート"
              onChange={(e) => setCommentMessage(e.target.value)}
            />
          </div>
          <Button className="commentBoxButton" type="submit">
            返信
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
