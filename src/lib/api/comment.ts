import client from './client'

const COMMENTS_PER_PAGE = 10

export const postComment = (comment: string, tweetId: number) => {
  return client.post('comments', { comment, tweet_id: tweetId })
}

export const getComments = (tweetId: number, currentPage: number) => {
  return client.get(`tweets/${tweetId}/comments`, {
    params: {
      limit: COMMENTS_PER_PAGE,
      offset: currentPage,
    },
  })
}
