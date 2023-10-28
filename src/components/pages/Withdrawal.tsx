import React, { useState } from 'react'
import styled from 'styled-components'
import { ErrorMessage } from '../organisms/ErrorMessage'
import { withdrawal } from '../../lib/api/auth'

export const Withdrawal: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isWithdrawal, setIsWithdrawal] = useState(false)

  const handleWithdrawal = (e: React.FormEvent) => {
    e.preventDefault()

    withdrawal()
      .then((res) => {
        if (res.status != 200) throw new Error('退会に失敗しました')

        setIsWithdrawal(true)
      })
      .catch((err) => {
        console.error(err)
        setErrorMessage((err.message || err) as string)
      })
  }

  return (
    <StyledWithdrawal>
      {!isWithdrawal && (
        <>
          <HeadingText>退会</HeadingText>
          <DescriptionText>退会しますか？</DescriptionText>
          <WithdrawalForm onSubmit={handleWithdrawal}>
            <WithdrawalButton type="submit">退会する</WithdrawalButton>
          </WithdrawalForm>
          {errorMessage !== '' && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </>
      )}
      {isWithdrawal && (
        <>
          <HeadingText>退会完了</HeadingText>
          <DescriptionText>ありがとうございました</DescriptionText>
        </>
      )}
    </StyledWithdrawal>
  )
}

const StyledWithdrawal = styled.div`
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`

const HeadingText = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`

const DescriptionText = styled.p``

const WithdrawalForm = styled.form`
  margin-bottom: 10px;
`

const WithdrawalButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`
