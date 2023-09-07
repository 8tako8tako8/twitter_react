import Cookies from 'js-cookie'

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

// 認証済みのユーザーを取得
export const getCurrentUser = () => {
  if (
    !Cookies.get('_access_token') ||
    !Cookies.get('_client') ||
    !Cookies.get('_uid')
  )
    return

  // prettier-ignore
  return client.get('/auth/sessions', {
    headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    },
  })
}
