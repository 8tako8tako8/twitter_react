import client from './client'

export const favorite = (tweetId: number) => {
  return client.post(`tweets/${tweetId}/favorite`)
}

export const cancelFavorite = (tweetId: number) => {
  return client.delete(`tweets/${tweetId}/favorite`)
}
