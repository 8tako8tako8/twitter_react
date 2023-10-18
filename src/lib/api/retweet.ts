import client from './client'

export const retweet = (tweetId: number) => {
  return client.post(`tweets/${tweetId}/retweet`)
}

export const cancelRetweet = (tweetId: number) => {
  return client.delete(`tweets/${tweetId}/retweet`)
}
