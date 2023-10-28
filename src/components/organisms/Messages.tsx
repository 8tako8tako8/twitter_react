import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { Message } from './Message'
import { getMessages } from '../../lib/api/message'

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
  selectedGroup: Group
}

export const Messages: React.FC<Props> = ({ selectedGroup }) => {
  const [messages, setMessages] = useState<Message[]>([])

  const handleGetMessages = (groupId: number) => {
    getMessages(groupId)
      .then((res) => {
        const resMessages: Message[] = res.data.messages
        setMessages(resMessages)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    handleGetMessages(selectedGroup.id)
  }, [])

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
