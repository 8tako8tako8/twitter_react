import React, { useEffect } from 'react'
import { styled } from 'styled-components'
import { Message } from './Message'

type Message = {
  id: number
  message: string
  user: {
    id: number
    name: string
    nickname: string
    avatarImageUrl: string
  }
  createdAt: string
  updatedAt: string
}

type Group = {
  id: number
  user: {
    id: number
    name: string
    nickname: string
    avatarImageUrl: string
  }
}

type Props = {
  messages: Message[]
  selectedGroup: Group
  handleGetMessages: (groupId: number) => void
}

export const Messages: React.FC<Props> = ({
  messages,
  selectedGroup,
  handleGetMessages,
}) => {
  useEffect(() => {
    handleGetMessages(selectedGroup.id)
  }, [selectedGroup.id])

  return (
    <StyledMessages>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </StyledMessages>
  )
}

const StyledMessages = styled.div`
  margin-bottom: 10px;
`
