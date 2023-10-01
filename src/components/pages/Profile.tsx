import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { SideBar } from '../templates/SideBar'
import { ProfileDetail } from '../organisms/ProfileDetail'
import { VariousPosts } from '../organisms/VariousPosts'
import { useParams } from 'react-router-dom'
import { getProfile } from '../../lib/api/profile'

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

// TODO: リツイート、いいね機能、アバター画像後に削除する
const initialUser: User = {
  id: 1,
  name: 'aliiiiii1',
  nickname: 'Alice',
  birthdate: '2000-01-01',
  location: 'Tokyo',
  websiteUrl: 'https://example.com',
  introduction: 'よろしくお願いします！',
  avatarUrl: 'https://source.unsplash.com/random',
  headerUrl: 'https://source.unsplash.com/random',
}

type Post = {
  id: number
  user: {
    id: string
    name: string
    nickname: string
    avatarUrl: string
  }
  tweet: string
  imageUrl: string
  retweets: number
  likes: number
}

// TODO: リツイート、いいね機能、アバター画像追加後に削除する
const initialPost: Post = {
  id: 1,
  user: {
    id: 'u1',
    name: 'aliiiiii1',
    nickname: 'Alice',
    avatarUrl: '/path/to/avatar1.png',
  },
  tweet: 'This is a sample tweet from Alice.',
  imageUrl: 'https://source.unsplash.com/random',
  retweets: 5,
  likes: 20,
}

type Profile = User & {
  posts?: Post[]
}

export const Profile: React.FC = () => {
  const [profile, setProfile] = useState(initialUser as Profile)
  const [posts, setPosts] = useState<Post[]>([])

  const { userId } = useParams()

  const handleGetProfile = (userId: number) => {
    getProfile(userId)
      .then((res) => {
        if (res && res.data) {
          const resProfile: Profile = {
            ...initialUser,
            id: res.data.id,
            name: res.data.name,
            nickname: res.data.nickname,
            birthdate: res.data.birthdate,
            location: res.data.location,
            websiteUrl: res.data.websiteUrl,
            introduction: res.data.introduction,
            avatarUrl: res.data.avatarImageUrl,
            headerUrl: res.data.headerImageUrl,
          }
          setProfile(resProfile)
          const resPosts: Post[] = (res.data.tweets as Post[]).map((tweet) => {
            return {
              ...initialPost,
              id: tweet.id,
              user: tweet.user,
              tweet: tweet.tweet,
              imageUrl: tweet.imageUrl,
              retweets: tweet.retweets,
              likes: tweet.likes,
            }
          })
          setPosts(resPosts)
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
        <ProfileDetail profile={profile} setProfile={setProfile} />
        <VariousPosts posts={posts} />
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
