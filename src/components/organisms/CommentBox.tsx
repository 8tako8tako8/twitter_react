import { Avatar, Button } from '@mui/material'
import React, { useState } from 'react'
import { styled } from 'styled-components'
import { postComment } from '../../lib/api/comment'
import { validateCommentMessage } from '../../validators/commentValidator'
import { ErrorMessage } from './ErrorMessage'
import { useParams } from 'react-router-dom'
import { FlashMessage } from './FlashMessage'

export const CommentBox: React.FC = () => {
  const [commentMessage, setCommentMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [openSuccessMessage, setOpenSuccessMessage] = useState(false)

  const { tweetId } = useParams()

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateCommentMessage(commentMessage)
    if (validationError) {
      setErrorMessage(validationError)
      return
    }

    postComment(commentMessage, Number(tweetId))
      .then((res) => {
        if (res.status != 201) throw new Error('コメント投稿に失敗しました')

        setOpenSuccessMessage(true)
        setCommentMessage('')
        setErrorMessage('')
      })
      .catch((err) => {
        setErrorMessage((err.message || err) as string)
        console.error(err)
      })
  }

  return (
    <StyledCommentBox>
      <FlashMessage
        open={openSuccessMessage}
        setOpen={setOpenSuccessMessage}
        severity="success"
      >
        コメント投稿しました
      </FlashMessage>
      <CommentCard>
        <CommentForm onSubmit={handleSendComment}>
          <CommentInputBlock>
            <Avatar />
            <CommentTextArea
              value={commentMessage}
              placeholder="コメントを投稿"
              onChange={(e) => setCommentMessage(e.target.value)}
            />
          </CommentInputBlock>
          <CommentButton className="commentBoxButton" type="submit">
            コメント
          </CommentButton>
        </CommentForm>
      </CommentCard>
      {errorMessage !== '' && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </StyledCommentBox>
  )
}

const StyledCommentBox = styled.div``

const CommentCard = styled.div`
  padding-bottom: 10px;
  padding-right: 10px;
  border-bottom: 1px solid var(--twitter-background);
`

const CommentForm = styled.form`
  display: flex;
  justify-content: space-between;
`

const CommentInputBlock = styled.div`
  padding: 20px;
  display: flex;
  width: 80%;
`

const CommentTextArea = styled.textarea`
  flex: 1;
  font-size: 20px;
  margin-left: 20px;
  border: none;
  resize: none;
  overflow: auto;
  min-width: 0;
`

const CommentButton = styled(Button)`
  background-color: var(--twitter-color) !important;
  color: white !important;
  font-weight: 900 !important;
  width: 80px !important;
  height: 40px !important;
  border-radius: 30px !important;
  margin-left: auto !important;
  margin-top: 20px !important;
`
