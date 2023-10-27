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
  selectedGroup: Group
  setSelectedGroup: React.Dispatch<React.SetStateAction<Group>>
}

export const Group: React.FC<Props> = ({
  group,
  selectedGroup,
  setSelectedGroup,
}) => {
  const handleSetSelectedGroup = () => {
    setSelectedGroup(group)
  }

  return (
    <StyledGroup onClick={handleSetSelectedGroup}>
      {selectedGroup.id === group.id && (
        <ActiveGroupCard>
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
        </ActiveGroupCard>
      )}
      {selectedGroup.id !== group.id && (
        <InactiveGroupCard>
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
        </InactiveGroupCard>
      )}
    </StyledGroup>
  )
}

const StyledGroup = styled.div``

const InactiveGroupCard = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid var(--twitter-background);
`

const ActiveGroupCard = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid var(--twitter-background);
  background-color: lightgrey;
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
