import client from './client'

export const follow = (userId: number) => {
  return client.post(`users/${userId}/follow`)
}

export const unfollow = (userId: number) => {
  return client.post(`users/${userId}/unfollow`)
}
