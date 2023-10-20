import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { SideBar } from '../templates/SideBar'
import { ProfileDetail } from '../organisms/ProfileDetail'
import { VariousPosts } from '../organisms/VariousPosts'
import { useParams } from 'react-router-dom'
import { getProfile } from '../../lib/api/profile'
import { useAppSelector } from '../../App'

type User = {
  id: number
  name: string
  nickname: string
  birthdate: string
  location: string
  websiteUrl: string
  introduction: string
  avatarImageUrl: string
  headerImageUrl: string
}

// TODO: リツイート、いいね機能、アバター画像後に削除する
const initialUser: User = {
  id: 1,
  name: 'aliiiiii1',
  nickname: 'Alice',
  birthdate: '2000-01-01',
  location: 'Tokyo',
  websiteUrl: 'https://example.com',
  introduction: 'よろしくお願いします！',
  avatarImageUrl: 'https://source.unsplash.com/random',
  headerImageUrl: 'https://source.unsplash.com/random',
}

type Post = {
  id: number
  user: {
    id: string
    name: string
    nickname: string
    avatarImageUrl: string
  }
  tweet: string
  imageUrl: string
  isRetweeted: boolean
  isFavorited: boolean
  retweets: number
  favorites: number
}

type Comment = {
  id: number
  user: {
    id: string
    name: string
    nickname: string
    avatarImageUrl: string
  }
  tweetId: number
  comment: string
}

// TODO: リツイート、いいね機能、アバター画像追加後に削除する
const initialPost: Post = {
  id: 1,
  user: {
    id: 'u1',
    name: 'aliiiiii1',
    nickname: 'Alice',
    avatarImageUrl: '/path/to/avatar1.png',
  },
  tweet: 'This is a sample tweet from Alice.',
  imageUrl: 'https://source.unsplash.com/random',
  isRetweeted: false,
  isFavorited: false,
  retweets: 5,
  favorites: 20,
}

type Profile = User & {
  posts?: Post[]
}

export const Profile: React.FC = () => {
  const [profile, setProfile] = useState(initialUser as Profile)
  const [posts, setPosts] = useState<Post[]>([])
  const [comments, setComments] = useState<Comment[]>([])

  const { userId } = useParams()
  const myUserId = useAppSelector((state) => state.user.userInfo?.id)
  const myself = userId === myUserId?.toString()

  const handleGetProfile = (userId: number) => {
    getProfile(userId)
      .then((res) => {
        if (res && res.data) {
          const {
            id,
            name,
            nickname,
            birthdate,
            location,
            websiteUrl,
            introduction,
            avatarImageUrl,
            headerImageUrl,
          } = res.data
          const resProfile: Profile = {
            ...initialUser,
            id: id,
            name: name,
            nickname: nickname,
            birthdate: birthdate,
            location: location,
            websiteUrl: websiteUrl,
            introduction: introduction,
            avatarImageUrl: avatarImageUrl,
            headerImageUrl: headerImageUrl,
          }
          setProfile(resProfile)

          const resPosts: Post[] = (res.data.tweets as Post[]).map((tweet) => {
            return {
              ...initialPost,
              id: tweet.id,
              user: tweet.user,
              tweet: tweet.tweet,
              imageUrl: tweet.imageUrl,
              isRetweeted: tweet.isRetweeted,
              isFavorited: tweet.isFavorited,
              retweets: tweet.retweets,
              favorites: tweet.favorites,
            }
          })
          setPosts(resPosts)

          const resComments: Comment[] = res.data.comments
          setComments(resComments)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    handleGetProfile(Number(userId))
  }, [userId])

  return (
    <StyledHome>
      <div className="sideBar">
        <SideBar />
      </div>
      <div className="profile">
        <ProfileDetail
          profile={profile}
          setProfile={setProfile}
          myself={myself}
        />
        <VariousPosts
          posts={posts}
          comments={comments}
          myself={myself}
          handleGetProfile={handleGetProfile}
        />
      </div>
    </StyledHome>
  )
}

const StyledHome = styled.div`
  display: flex;
  height: 100vh;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 10px;

  .sideBar {
    border-right: 1px solid var(--twitter-background);
    min-width: 300px;
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .profile {
    min-width: 600px;
    border-right: 1px solid var(--twitter-background);
    overflow-y: scroll;
  }

  .post::-webkit-scrollbar {
    display: none;
  }
`
