import React from 'react'
import { styled } from 'styled-components'

export const Group: React.FC = () => {
  const nickName = 'aaaabbbbxx'

  return (
    <StyledGroup>
      <GroupCard>
        <AvatarImageBlock>
          {true && <AvatarImage src="https://source.unsplash.com/random" />}
        </AvatarImageBlock>
        <GroupCardBody>
          <GroupCardName>{nickName}</GroupCardName>
        </GroupCardBody>
      </GroupCard>
    </StyledGroup>
  )
}

const StyledGroup = styled.div``

const GroupCard = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid var(--twitter-background);
`

const AvatarImage = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`

const AvatarImageBlock = styled.div`
  padding: 15px;
`

const GroupCardBody = styled.div`
  flex: 1;
  min-width: 0;
`

const GroupCardName = styled.h3`
  font-size: 15px;
  margin-bottom: 5px;
`
