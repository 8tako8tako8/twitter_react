import React from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

import { ErrorMessage } from '../organisms/ErrorMessage'
import { LoginParams } from '../../types'
import { login } from '../../lib/api/auth'
import { setCurrentUser } from '../../redux/userSlice'
import { useAppDispatch } from '../../App'

const homeUrl = process.env.PUBLIC_URL

export const Login: React.FC = () => {
  const [loginInput, setLoginInput] = React.useState({
    email: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = React.useState<string>('')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onChangeLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginInput({ ...loginInput, [name]: value })
  }

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()

    const params: LoginParams = {
      email: loginInput.email,
      password: loginInput.password,
    }

    login(params)
      .then((res) => {
        if (res.status === 200) {
          Cookies.set('_access_token', res.headers['access-token'] as string, {
            secure: true,
          })
          Cookies.set('_client', res.headers['client'] as string, {
            secure: true,
          })
          Cookies.set('_uid', res.headers['uid'] as string, { secure: true })

          const { email, name, nickname, image } = res.data.data
          const userId = res.data.data.id
          dispatch(
            setCurrentUser({ email, name, nickname, image, userId: userId })
          )
          setErrorMessage('')

          // ホーム画面に遷移させる
          navigate(homeUrl)
        } else {
          setErrorMessage('ログインに失敗しました')
        }
      })
      .catch((err) => {
        if (typeof err.response?.data?.errors[0] === 'string') {
          setErrorMessage(err.response.data.errors[0])
        } else {
          console.error(err)
          setErrorMessage('不明なエラー。しばらく時間をおいて試してください。')
        }
      })
  }

  return (
    <StyledSignIn>
      <h2>ログイン</h2>
      <form onSubmit={handleSignIn}>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            name="email"
            type="email"
            value={loginInput.email}
            onChange={onChangeLoginInput}
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            id="password"
            name="password"
            type="password"
            value={loginInput.password}
            onChange={onChangeLoginInput}
          />
        </div>
        <button type="submit">ログイン</button>
        {errorMessage !== '' && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </form>
    </StyledSignIn>
  )
}

const StyledSignIn = styled.div`
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  h2 {
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

    .error {
      color: red;
      margin-top: 10px;
    }
  }
`
