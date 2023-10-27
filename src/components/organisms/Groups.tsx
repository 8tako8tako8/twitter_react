import React from 'react'
import { styled } from 'styled-components'
import { Group } from './Group'

export const Groups: React.FC = () => {
  return (
    <StyledGroups>
      <Group />
      <Group />
      <Group />
      <Group />
    </StyledGroups>
  )
}

const StyledGroups = styled.div``
