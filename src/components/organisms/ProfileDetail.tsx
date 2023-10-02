import { LocationOn, VerifiedUser } from '@mui/icons-material'
import LinkIcon from '@mui/icons-material/Link'
import CakeIcon from '@mui/icons-material/Cake'
import { Button } from '@mui/material'
import React, { useState } from 'react'
import { styled } from 'styled-components'
import { ProfileDetailModal } from './ProfileDetailModal'
import { useAppSelector } from '../../App'
import { ProfileSubInfo } from './ProfileSubInfo'

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

type Profile = User & {
  posts?: Post[]
}

type Props = {
  profile: Profile
  setProfile: React.Dispatch<React.SetStateAction<Profile>>
}

export const ProfileDetail: React.FC<Props> = ({ profile, setProfile }) => {
  const [isModalOpen, setModalOpen] = useState(false)

  const myUserId = useAppSelector((state) => state.user.userInfo?.id)

  const toggleModal = () => {
    setModalOpen(!isModalOpen)
  }

  const PROFILE_SUB_INFO_LIST = [
    {
      class: 'profileBodySubInfoLocation',
      key: 'location',
      subInfo: profile.location,
      icon: LocationOn,
    },
    {
      class: 'profileBodySubInfoBirthdate',
      key: 'birthdate',
      subInfo: profile.birthdate,
      icon: CakeIcon,
    },
    {
      class: 'profileBodySubInfoWebsiteUrl',
      key: 'websiteUrl',
      subInfo: profile.websiteUrl,
      icon: LinkIcon,
    },
  ]

  return (
    <StyledProfileDetail>
      <div className="profileDetail">
        <div className="profileHeader">
          {profile.headerUrl ? (
            <img src={profile.headerUrl} />
          ) : (
            <img src={`${process.env.PUBLIC_URL}/dark.png`} />
          )}
        </div>
        <div className="profileBody">
          <div className="profileBodyTop">
            <div className="profileAvatar">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} />
              ) : (
                <img src={`${process.env.PUBLIC_URL}/no_image.png`} />
              )}
            </div>
            {myUserId === profile.id && (
              <Button
                className="profileBodyTopEditButton"
                onClick={toggleModal}
              >
                プロフィールを編集する
              </Button>
            )}
          </div>
          <h3>
            {profile.nickname}
            <span className="profileBodySpecial">
              <VerifiedUser className="profileBadge" />
              {profile.name}
            </span>
          </h3>
          <div className="profileBodyIntroduction">
            <p>{profile.introduction}</p>
          </div>
          <div className="profileBodySubInfo">
            {PROFILE_SUB_INFO_LIST.map((item) => (
              <ProfileSubInfo key={item.key} subInfo={item.subInfo}>
                <item.icon />
              </ProfileSubInfo>
            ))}
          </div>
        </div>
      </div>
      <ProfileDetailModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        profile={profile}
        setProfile={setProfile}
      />
    </StyledProfileDetail>
  )
}

const StyledProfileDetail = styled.div`
  .profileDetail {
  }

  .profileHeader > img {
    border-radius: 20px;
    height: 250px;
    width: 100%;
  }

  .profileBody {
    margin-left: 10px;
  }

  p {
    margin: 0;
    padding: 0;
  }

  .profileBodyIntroduction {
    margin-bottom: 10px;
    font-size: 15px;
    white-space: normal;
    word-wrap: break-word;
  }

  .profileBodyTop {
    display: flex;
    align-items: center;
  }

  .profileBodyTopEditButton {
    background-color: black !important;
    color: white !important;
    font-weight: 900 !important;
    width: 180px !important;
    height: 40px !important;
    border-radius: 30px !important;
    margin-left: auto !important;
    margin-right: 10px !important;
  }

  .profileBody > h3 {
    font-size: 15px;
  }

  .profileBadge {
    font-size: 14px !important;
    color: var(--twitter-color);
  }

  .profileBodySpecial {
    font-weight: 600;
    font-size: 12px;
    color: gray;
  }

  .profileAvatar {
    padding: 8px;

    img {
      border-radius: 50%;
      width: 100px;
      height: 100px;
    }
  }

  .profileBodySubInfo {
    display: flex;
    align-items: center;
    color: gray;
  }
`
