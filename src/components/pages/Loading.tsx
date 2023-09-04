import React from 'react'
import styled from 'styled-components'
import { LoadingSpin } from '../organisms/LoadingSpin'

export const Loading: React.FC = () => {
  return (
    <StyledLoading>
      <LoadingSpin />
    </StyledLoading>
  )
}

const StyledLoading = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
