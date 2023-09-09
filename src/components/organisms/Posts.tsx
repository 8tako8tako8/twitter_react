import React, { useState } from 'react'
import styled from 'styled-components'
import { Post } from './Post'

type Tweet = {
  id: number
  user: {
    id: string
    userName: string
    displayName: string
    avatarUrl: string
  }
  content: string
  image: string
  retweets: number
  likes: number
}

const sampleTweets: Tweet[] = [
  {
    id: 1,
    user: {
      id: 'u1',
      userName: 'aliiiiii1',
      displayName: 'Alice',
      avatarUrl: '/path/to/avatar1.png',
    },
    content: 'This is a sample tweet from Alice.',
    image: 'https://source.unsplash.com/random',
    retweets: 5,
    likes: 20,
  },
  {
    id: 2,
    user: {
      id: 'u2',
      userName: 'booooooooc',
      displayName: 'Bob',
      avatarUrl: '/path/to/avatar2.png',
    },
    content: 'Another sample tweet, this time from Bob.',
    image: '',
    retweets: 10,
    likes: 15,
  },
]

export const Posts: React.FC = () => {
  const [tweets] = useState<Tweet[]>(sampleTweets)

  return (
    <StyledPost>
      {tweets.map((tweet) => (
        <Post key={tweet.id} tweet={tweet} />
      ))}
    </StyledPost>
  )
}

const StyledPost = styled.div`
  .post {
    display: flex;
    align-items: flex-start;
    border-bottom: 1px solid var(--twitter-background);
  }

  .postBody {
    flex: 1;
  }

  p {
    margin: 0;
    padding: 0;
  }

  .postBody > img {
    border-radius: 20px;
    width: 100%;
  }

  .postFooter {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 10px;
  }

  .postHeaderDescription {
    margin-bottom: 10px;
    font-size: 15px;
  }

  .postHeaderText > h3 {
    font-size: 15px;
    margin-bottom: 5px;
  }

  .postBadge {
    font-size: 14px !important;
    color: var(--twitter-color);
  }

  .postHeaderSpecial {
    font-weight: 600;
    font-size: 12px;
    color: gray;
  }

  .postAvatar {
    padding: 15px;
  }
`
