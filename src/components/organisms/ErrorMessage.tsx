import React from 'react'
import styled from 'styled-components'

type Props = {
  children: React.ReactNode
}

export const ErrorMessage: React.FC<Props> = (props) => {
  const { children } = props

  return (
    <StyledErrorMessage>
      <div>
        <p>{children}</p>
      </div>
    </StyledErrorMessage>
  )
}

const StyledErrorMessage = styled.div`
  background-color: #ff7f7f;
  color: #fff;
  text-align: center;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;

  p {
    margin: 0;
    font-weight: bold;
  }
`
