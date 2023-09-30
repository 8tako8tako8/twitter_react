import React from 'react'
import { SideBarOption } from '../molecules/SideBarOption'
import HomeIcon from '@mui/icons-material/Home'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import styled from 'styled-components'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '../../App'

const homeUrl = process.env.PUBLIC_URL

export const SideBarOptionList: React.FC = () => {
  const location = useLocation()

  const userId = useAppSelector((state) => state.user.userInfo?.userId)

  const SIDEBAR_LIST = [
    {
      text: 'ホーム',
      icon: HomeIcon,
      linkTo: `${homeUrl}/`,
      isActive: location.pathname === '/',
    },
    {
      text: '通知',
      icon: NotificationsNoneIcon,
      linkTo: `${homeUrl}/notifications`,
      isActive: location.pathname === '/notifications',
    },
    {
      text: 'メッセージ',
      icon: MailOutlineIcon,
      linkTo: `${homeUrl}/messages`,
      isActive: location.pathname === '/messages',
    },
    {
      text: 'ブックマーク',
      icon: BookmarkBorderIcon,
      linkTo: `${homeUrl}/bookmarks`,
      isActive: location.pathname === '/bookmarks',
    },
    {
      text: 'プロフィール',
      icon: PermIdentityIcon,
      linkTo: userId !== null ? `${homeUrl}/users/${userId}` : `${homeUrl}`,
      isActive: location.pathname === '/profile',
    },
    {
      text: '退会',
      icon: MoreHorizIcon,
      linkTo: `${homeUrl}/cancel`,
      isActive: location.pathname === '/cancel',
    },
  ]

  return (
    <StyledSideBarOptionList>
      {SIDEBAR_LIST.map((item) => (
        <SideBarOption
          key={item.text}
          text={item.text}
          linkTo={item.linkTo}
          isActive={item.isActive}
        >
          <item.icon />
        </SideBarOption>
      ))}
    </StyledSideBarOptionList>
  )
}

const StyledSideBarOptionList = styled.div``
