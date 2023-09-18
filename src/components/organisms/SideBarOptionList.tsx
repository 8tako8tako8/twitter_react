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

export const SideBarOptionList: React.FC = () => {
  const location = useLocation()

  const SIDEBAR_LIST = [
    { text: 'ホーム', icon: HomeIcon, isActive: location.pathname === '/' },
    {
      text: '通知',
      icon: NotificationsNoneIcon,
      isActive: location.pathname === '/notifications',
    },
    {
      text: 'メッセージ',
      icon: MailOutlineIcon,
      isActive: location.pathname === '/messages',
    },
    {
      text: 'ブックマーク',
      icon: BookmarkBorderIcon,
      isActive: location.pathname === '/bookmarks',
    },
    {
      text: 'プロフィール',
      icon: PermIdentityIcon,
      isActive: location.pathname === '/profile',
    },
    {
      text: '退会',
      icon: MoreHorizIcon,
      isActive: location.pathname === '/cancel',
    },
  ]

  return (
    <StyledSideBarOptionList>
      {SIDEBAR_LIST.map((item) => (
        <SideBarOption text={item.text} isActive={item.isActive}>
          <item.icon />
        </SideBarOption>
      ))}
    </StyledSideBarOptionList>
  )
}

const StyledSideBarOptionList = styled.div``
