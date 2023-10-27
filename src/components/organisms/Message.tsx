import React from 'react'
import { styled } from 'styled-components'

type Props = {
  myself: boolean
}

export const Message: React.FC<Props> = ({ myself }) => {
  const message =
    'ああああああああああああああああああああああああああああああああああああああああああああああ'

  return (
    <StyledMessage>
      <>
        {myself && (
          <MyMessageBlock>
            <MyMessageContainer>
              <MyMessage>{message}</MyMessage>
            </MyMessageContainer>
          </MyMessageBlock>
        )}
        {!myself && (
          <YourMessageBlock>
            <YourMessageContainer>
              <YourMessage>{message}</YourMessage>
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
