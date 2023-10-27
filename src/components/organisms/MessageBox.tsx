import { Button } from '@mui/material'
import React, { useState } from 'react'
import { styled } from 'styled-components'

export const MessageBox: React.FC = () => {
  const [message, setMessage] = useState('')

  return (
    <StyledMessageBox>
      <MessageCard>
        <MessageForm>
          <MessageInputBlock>
            <MessageTextArea
              value={message}
              placeholder="メッセージを投稿"
              onChange={(e) => setMessage(e.target.value)}
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
