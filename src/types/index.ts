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

// プロフィール更新
export interface SaveProfileParams {
  nickname: string
  birthdate: string
  location: string
  websiteUrl: string
  introduction: string
}
