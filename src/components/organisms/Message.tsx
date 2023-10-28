import React from 'react'
import { styled } from 'styled-components'
import { useAppSelector } from '../../App'

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

type Props = {
  message: Message
}

export const Message: React.FC<Props> = ({ message }) => {
  const myUserId = useAppSelector((state) => state.user.userInfo?.id)
  const myself = message.user.id === myUserId

  return (
    <StyledMessage>
      <>
        {myself && (
          <MyMessageBlock>
            <MyMessageContainer>
              <MyMessage>{message.message}</MyMessage>
            </MyMessageContainer>
          </MyMessageBlock>
        )}
        {!myself && (
          <YourMessageBlock>
            <YourMessageContainer>
              <YourMessage>{message.message}</YourMessage>
            </YourMessageContainer>
          </YourMessageBlock>
        )}
      </>
    </StyledMessage>
  )
}

const StyledMessage = styled.div``

const MyMessageBlock = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  margin-right: 10px;
`

const MyMessageContainer = styled.div`
  border-radius: 10px;
  padding: 5px 10px;
  margin: 5px;
  background-color: var(--twitter-color);
  max-width: 200px;
  word-wrap: break-word;
`

const YourMessageBlock = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 10px;
`

const YourMessageContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 5px 10px;
  margin: 5px;
  max-width: 200px;
  word-wrap: break-word;
`

const MyMessage = styled.h3`
  font-size: 15px;
  color: white;
  margin: 0;
`

const YourMessage = styled.h3`
  font-size: 15px;
  margin: 0;
`
