import client from './client'
import { SignUpParams, LoginParams } from '../../types/index'

// サインアップ
export const signUp = (params: SignUpParams) => {
  return client.post('users', params)
}

// ログイン
export const login = (params: LoginParams) => {
  return client.post('users/sign_in', params)
}
