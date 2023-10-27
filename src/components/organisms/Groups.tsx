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
}

export const Groups: React.FC<Props> = ({ groups }) => {
  return (
    <StyledGroups>
      {groups.map((group) => (
        <Group key={group.id} group={group} />
      ))}
    </StyledGroups>
  )
}

const StyledGroups = styled.div``
