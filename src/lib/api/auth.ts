/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import client from './client'
import { SignUpParams } from '../../types/index'

// サインアップ
export const signUp = (params: SignUpParams) => {
  return client.post('users', params)
}
