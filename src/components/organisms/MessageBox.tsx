import { Button } from '@mui/material'
import React, { useState } from 'react'
import { styled } from 'styled-components'
import { sendMessage } from '../../lib/api/message'
import { validateDirectMessage } from '../../validators/messageValidator'

type Props = {
  groupId: number
  handleGetMessages: (groupId: number) => void
}

export const MessageBox: React.FC<Props> = ({ groupId, handleGetMessages }) => {
  const [directMessage, setDirectMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateDirectMessage(directMessage)
    if (validationError) {
      // setErrorMessage(validationError)
      return
    }

    sendMessage(directMessage, groupId)
      .then((res) => {
        if (res.status != 201) throw new Error('に失敗しました')

        setDirectMessage('')
        // setErrorMessage('')

        handleGetMessages(groupId)
      })
      .catch((err) => {
        // setErrorMessage((err.message || err) as string)
        console.error(err)
      })
  }

  return (
    <StyledMessageBox>
      <MessageCard>
        <MessageForm onSubmit={handleSendMessage}>
          <MessageInputBlock>
            <MessageTextArea
              value={directMessage}
              placeholder="メッセージを投稿"
              onChange={(e) => setDirectMessage(e.target.value)}
            />
          </MessageInputBlock>
          <MessageButton type="submit">送信</MessageButton>
        </MessageForm>
      </MessageCard>
    </StyledMessageBox>
  )
}

const StyledMessageBox = styled.div``

const MessageCard = styled.div`
  padding-bottom: 10px;
  padding-right: 10px;
  border-top: 1px solid var(--twitter-background);
  border-bottom: 1px solid var(--twitter-background);
`

const MessageForm = styled.form`
  display: flex;
  justify-content: space-between;
`

const MessageInputBlock = styled.div`
  padding: 20px;
  display: flex;
  width: 80%;
`

const MessageTextArea = styled.textarea`
  flex: 1;
  font-size: 20px;
  margin-left: 20px;
  border: none;
  resize: none;
  overflow: auto;
  min-width: 0;
`

const MessageButton = styled(Button)`
  background-color: var(--twitter-color) !important;
  color: white !important;
  font-weight: 900 !important;
  width: 80px !important;
  height: 40px !important;
  border-radius: 30px !important;
  margin-left: auto !important;
  margin-top: 20px !important;
`
