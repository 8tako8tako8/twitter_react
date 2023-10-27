import React from 'react'
import { styled } from 'styled-components'
import { Message } from './Message'

export const Messages: React.FC = () => {
  return (
    <StyledMessages>
      <Message myself={true} />
      <Message myself={false} />
      <Message myself={true} />
      <Message myself={false} />
      <Message myself={false} />
      <Message myself={false} />
      <Message myself={false} />
      <Message myself={false} />
    </StyledMessages>
  )
}

const StyledMessages = styled.div`
  margin-bottom: 10px;
`
