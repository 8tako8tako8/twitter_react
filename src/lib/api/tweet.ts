import client from './client'

const POSTS_PER_PAGE = 10

export const getPosts = (currentPage: number) => {
  return client.get('tweets', {
    params: {
      limit: POSTS_PER_PAGE,
      offset: currentPage,
    },
  })
}

export const getPost = (tweetId: number) => {
  return client.get(`tweets/${tweetId}`)
}

export const postTweet = (tweet: string) => {
  return client.post('tweets', { tweet: tweet })
}

export const postTweetImage = (tweetId: number, image: File) => {
  const formData = new FormData()
  formData.append('image', image)
  formData.append('tweet_id', tweetId.toString())

  return client.post(`images`, formData)
}
