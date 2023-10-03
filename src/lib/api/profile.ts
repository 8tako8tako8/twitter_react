import { SaveProfileParams } from '../../types'
import client from './client'

export const getProfile = (userId: number) => {
  return client.get(`users/${userId}`)
}

export const saveProfile = (profile: SaveProfileParams) => {
  const { nickname, birthdate, location, websiteUrl, introduction } = profile
  return client.put('profile', {
    nickname,
    birthdate,
    location,
    websiteUrl,
    introduction,
  })
}

export const saveAvatarImage = (image: File) => {
  const formData = new FormData()
  formData.append('image', image)

  return client.put('profile/avatar_image', formData)
}

export const saveHeaderImage = (image: File) => {
  const formData = new FormData()
  formData.append('image', image)

  return client.put('profile/header_image', formData)
}
