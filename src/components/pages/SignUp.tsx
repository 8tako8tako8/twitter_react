/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import styled from 'styled-components'
import { signUp } from '../../lib/api/auth'
import { SignUpParams } from '../../types'

export const SignUp: React.FC = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('')

  const homeUrl = process.env.PUBLIC_URL

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()

    console.log(email, password, passwordConfirmation)

    const params: SignUpParams = {
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
      confirmSuccessURL: homeUrl + '/confirm',
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    signUp(params)
      .then((res) => {
        if (res.status === 200) {
          console.log('success')
        } else {
          console.log('failed')
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <StyledSignUp>
      <h1>アカウント登録</h1>
      <form onSubmit={handleSignUp}>
        <div className="inputArea">
          <label htmlFor="email">メールアドレス:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inputArea">
          <label htmlFor="password">パスワード:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="inputArea">
          <label htmlFor="password">パスワード確認:</label>
          <input
            id="passwordConfirmation"
            type="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
        <button type="submit">登録</button>
      </form>
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
