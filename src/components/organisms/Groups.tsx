import React from 'react'
import { styled } from 'styled-components'
import { Group } from './Group'

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
  groups: Group[]
  selectedGroup: Group
  setSelectedGroup: React.Dispatch<React.SetStateAction<Group>>
}

export const Groups: React.FC<Props> = ({
  groups,
  selectedGroup,
  setSelectedGroup,
}) => {
  return (
    <StyledGroups>
      {groups.map((group) => (
        <Group
          key={group.id}
          group={group}
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
        />
      ))}
    </StyledGroups>
  )
}

const StyledGroups = styled.div``
