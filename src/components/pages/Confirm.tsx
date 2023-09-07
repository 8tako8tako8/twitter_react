import React from 'react'
import styled from 'styled-components'

export const Confirm: React.FC = () => {
  const homeUrl = process.env.PUBLIC_URL

  return (
    <StyledConfirm>
      <h2>メール認証が完了しました</h2>
      <a href={homeUrl + '/login'}>ログインする</a>
    </StyledConfirm>
  )
}

const StyledConfirm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 50px auto;

  h2 {
    margin-bottom: 20px;
    color: #333;
  }

  a {
    color: #007bff;
    text-decoration: none;
    padding: 10px 20px;
    border: 1px solid #007bff;
    border-radius: 5px;
    transition:
      background-color 0.3s,
      color 0.3s;

    &:hover {
      background-color: #007bff;
      color: white;
    }
  }
`
