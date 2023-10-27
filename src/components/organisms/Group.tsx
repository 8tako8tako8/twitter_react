import React from 'react'
import { styled } from 'styled-components'

type User = {
  id: number
  name: string
  nickname: string
  avatarImageUrl: string
}

type Group = {
  id: number
  user: User
}

type Props = {
  group: Group
}

export const Group: React.FC<Props> = ({ group }) => {
  return (
    <StyledGroup>
      <GroupCard>
        <AvatarImageBlock>
          {group.user.avatarImageUrl ? (
            <AvatarImage src={group.user.avatarImageUrl} />
          ) : (
            <AvatarImage src={`${process.env.PUBLIC_URL}/no_image.png`} />
          )}
        </AvatarImageBlock>
        <GroupCardBody>
          <GroupCardName>{group.user.nickname}</GroupCardName>
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
