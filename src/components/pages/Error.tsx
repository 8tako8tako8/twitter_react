import React from 'react'
import styled from 'styled-components'

export const Error: React.FC = () => {
  return (
    <StyledError>
      <h2>エラーが発生しました</h2>
      <p>申し訳ございません、何らかのエラーが発生しました。</p>
    </StyledError>
  )
}

const StyledError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fafafa;
  text-align: center;
  padding: 20px;

  h2 {
    margin-top: 20px;
  }

  p {
    margin-top: 10px;
    color: #333;
  }
`
