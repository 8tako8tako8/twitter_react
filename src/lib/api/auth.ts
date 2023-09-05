import client from './client'
import { SignUpParams } from '../../types/index'

// サインアップ
export const signUp = (params: SignUpParams) => {
  return client.post('users', params)
}
