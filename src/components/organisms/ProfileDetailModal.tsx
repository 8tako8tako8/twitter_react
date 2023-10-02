import { Button, Modal, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import {
  saveAvatarImage,
  saveHeaderImage,
  saveProfile,
} from '../../lib/api/profile'
import {
  ProfileErrors,
  validateProfile,
} from '../../validators/profileValidator'

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
  isModalOpen: boolean
  toggleModal: () => void
  profile: Profile
  setProfile: React.Dispatch<React.SetStateAction<Profile>>
}

export const ProfileDetailModal: React.FC<Props> = ({
  isModalOpen,
  toggleModal,
  profile,
  setProfile,
}) => {
  const [editingProfile, setEditingProfile] = useState<Profile>({ ...profile })
  const [validationErrors, setValidationErrors] = useState<ProfileErrors>({})

  const avatarImageInputRef = useRef<HTMLInputElement>(null)
  const headerImageInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setEditingProfile({
      ...editingProfile,
      [name]: value,
    })
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()

    setValidationErrors({})
    const errors = validateProfile(editingProfile as User)
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      return
    }

    const avatarImageFile = avatarImageInputRef.current?.files?.[0]
    const avatarImagePromise = avatarImageFile
      ? saveAvatarImage(avatarImageFile)
      : Promise.resolve(null)

    const headerImageFile = headerImageInputRef.current?.files?.[0]
    const headerImagePromise = headerImageFile
      ? saveHeaderImage(headerImageFile)
      : Promise.resolve(null)

    Promise.all([
      saveProfile(editingProfile),
      avatarImagePromise,
      headerImagePromise,
    ])
      .then(([profileResponse, avatarImageResponse, headerImageResponse]) => {
        const resProfile: Profile = profileResponse.data
        const resAvatarUrl =
          avatarImageResponse?.data.avatarImageUrl || editingProfile.avatarUrl
        const resHeaderUrl =
          headerImageResponse?.data.headerImageUrl || editingProfile.headerUrl
        setProfile({
          ...resProfile,
          avatarUrl: resAvatarUrl,
          headerUrl: resHeaderUrl,
        })
      })
      .catch((err) => {
        console.error(err)
      })
    toggleModal()
  }

  useEffect(() => {
    setEditingProfile({ ...profile })
  }, [profile])

  return (
    <StyledProfileDetailModal>
      <Modal open={isModalOpen} onClose={toggleModal}>
        <StyledModalContent>
          <form onSubmit={handleSaveProfile}>
            <StyledHeader>
              <h2>プロフィール編集</h2>
              <SaveButton type="submit">保存</SaveButton>
            </StyledHeader>
            <label htmlFor="headerImageInput">ヘッダー画像</label>
            <input
              ref={headerImageInputRef}
              id="headerImageInput"
              className="headerImageInput"
              type="file"
              accept="image/png, image/jpeg"
            />
            <label htmlFor="avatarImageInput">アバター画像</label>
            <input
              ref={avatarImageInputRef}
              id="avatarImageInput"
              className="avatarImageInput"
              type="file"
              accept="image/png, image/jpeg"
            />
            <TextField
              fullWidth
              margin="normal"
              label="ニックネーム"
              name="nickname"
              value={editingProfile.nickname}
              InputLabelProps={{ shrink: true }}
              onChange={handleInputChange}
              error={Boolean(validationErrors.nickname)}
              helperText={validationErrors.nickname}
            />
            <TextField
              fullWidth
              margin="normal"
              label="自己紹介"
              name="introduction"
              value={editingProfile.introduction}
              InputLabelProps={{ shrink: true }}
              onChange={handleInputChange}
              error={Boolean(validationErrors.introduction)}
              helperText={validationErrors.introduction}
            />
            <TextField
              fullWidth
              margin="normal"
              label="ウェブサイトURL"
              name="websiteUrl"
              value={editingProfile.websiteUrl}
              InputLabelProps={{ shrink: true }}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="場所"
              name="location"
              value={editingProfile.location}
              InputLabelProps={{ shrink: true }}
              onChange={handleInputChange}
              error={Boolean(validationErrors.location)}
              helperText={validationErrors.location}
            />
            <TextField
              fullWidth
              margin="normal"
              label="誕生日"
              name="birthdate"
              type="date"
              value={editingProfile.birthdate}
              InputLabelProps={{ shrink: true }}
              onChange={handleInputChange}
            />
          </form>
        </StyledModalContent>
      </Modal>
    </StyledProfileDetailModal>
  )
}

const StyledProfileDetailModal = styled.div``

const StyledModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  max-width: 500px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  outline: none;

  label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
  }

  input[type='file'] {
    display: block;
    margin: 10px 0;
    padding: 5px;
  }
`

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const SaveButton = styled(Button)`
  background-color: var(--twitter-color) !important;
  color: white !important;
  font-weight: 900 !important;
  width: 130px !important;
  height: 40px !important;
  border-radius: 30px !important;
`
