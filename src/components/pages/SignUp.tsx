import React, { useState } from 'react'
import styled from 'styled-components'
import { signUp } from '../../lib/api/auth'
import { SignUpParams } from '../../types'
import { ErrorMessage } from '../organisms/ErrorMessage'

export const SignUp: React.FC = () => {
  const [registrationInput, setregistrationInput] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  const [isSignUp, setIsSignUp] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onChangeRegistrationInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    setregistrationInput({ ...registrationInput, [name]: value })
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()

    const confirmSuccessURL =
      process.env.NODE_ENV === 'production'
        ? (process.env.REACT_APP_CONFIRM_SUCCESS_URL_PROD as string)
        : (process.env.REACT_APP_CONFIRM_SUCCESS_URL_LOCAL as string)

    const params: SignUpParams = {
      ...registrationInput,
      confirmSuccessURL: confirmSuccessURL,
    }

    signUp(params)
      .then((res) => {
        if (res.status === 200) {
          setIsSignUp(true)
          setErrorMessage('')
        } else {
          setErrorMessage('登録に失敗しました')
        }
      })
      .catch((err) => {
        console.log(err)
        setErrorMessage('メールアドレス または パスワード が正しくありません')
      })
  }

  return (
    <StyledSignUp>
      <h1>アカウント登録</h1>
      {!isSignUp && (
        <form onSubmit={handleSignUp}>
          <div className="inputArea">
            <label htmlFor="email">メールアドレス:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={registrationInput.email}
              onChange={onChangeRegistrationInput}
            />
          </div>
          <div className="inputArea">
            <label htmlFor="password">パスワード:</label>
            <input
              id="password"
              name="password"
              type="password"
              value={registrationInput.password}
              onChange={onChangeRegistrationInput}
            />
          </div>
          <div className="inputArea">
            <label htmlFor="passwordConfirmation">パスワード確認:</label>
            <input
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              value={registrationInput.passwordConfirmation}
              onChange={onChangeRegistrationInput}
            />
          </div>
          <button type="submit">登録</button>
        </form>
      )}

      {isSignUp && (
        <p>ご登録ありがとうございます。メールを確認してください。</p>
      )}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </StyledSignUp>
  )
}

const StyledSignUp = styled.div`
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  form {
    div {
      margin-bottom: 10px;
    }

    label {
      display: block;
      margin-bottom: 5px;
    }

    input {
      width: 95%;
      padding: 8px;
      margin-right: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
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
    }
  }
`
