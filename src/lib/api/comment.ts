import client from './client'

export const postComment = (comment: string, tweetId: number) => {
  return client.post('comments', { comment: comment, tweet_id: tweetId })
}
