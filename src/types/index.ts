// サインアップ
export interface SignUpParams {
  email: string
  password: string
  passwordConfirmation: string
  confirmSuccessURL: string
}

// ログイン
export interface LoginParams {
  email: string
  password: string
}
