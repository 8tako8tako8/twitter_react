type User = {
  id: number
  name: string
  nickname: string
  birthdate: string
  location: string
  websiteUrl: string
  introduction: string
  avatarUrl: string
  headerUrl: string
}

export type ProfileErrors = Partial<User>

export const validateProfile = (profile: User): ProfileErrors => {
  const errors: ProfileErrors = {}
  if (!profile.nickname || profile.nickname.length === 0) {
    errors.nickname = 'ニックネームを入力してください'
  } else if (profile.nickname.length > 20) {
    errors.nickname = 'ニックネームは20文字以内で入力してください'
  }

  if (profile.introduction && profile.introduction.length > 100) {
    errors.introduction = '自己紹介は100文字以内で入力してください'
  }

  if (profile.location && profile.location.length > 10) {
    errors.location = '場所は10文字以内で入力してください'
  }
  return errors
}
