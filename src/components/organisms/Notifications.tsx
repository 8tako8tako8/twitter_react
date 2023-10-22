/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pagination } from '@mui/material'
import styled from 'styled-components'
import { Loading } from '../pages/Loading'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Notification } from './Notification'
import { getNotifications } from '../../lib/api/notification'

type Notification = {
  id: number
  subjectType: string
  user: {
    id: string
    name: string
    nickname: string
    avatarImageUrl: string
  }
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    subjectType: 'comment',
    user: {
      id: '1',
      name: 'test',
      nickname: 'test',
      avatarImageUrl: '',
    },
  },
  {
    id: 2,
    subjectType: 'favorite',
    user: {
      id: '1',
      name: 'test',
      nickname: 'test',
      avatarImageUrl: '',
    },
  },
  {
    id: 3,
    subjectType: 'retweet',
    user: {
      id: '1',
      name: 'test',
      nickname: 'test',
      avatarImageUrl: '',
    },
  },
]

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications)
  const [loading, setLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const navigate = useNavigate()

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page)
    navigate({ ...location, search: `?page=${page}` })
    handleGetNotifications(page)
  }

  const handleGetNotifications = (page: number) => {
    setLoading(true)

    getNotifications(page)
      .then((res) => {
        if (res && res.data) {
          setTotalPages((res.data.pagination.totalPages as number) || 1)
          const resNotifications: Notification[] = res.data.notifications
          setNotifications(resNotifications)
        }
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    //  クエリパラメータからpageを取得する
    const queryParams = new URLSearchParams(location.search)
    const page = Number(queryParams.get('page')) || 1

    setCurrentPage(page)
    handleGetNotifications(page)
  }, [location.search])

  if (loading) {
    return <Loading />
  }

  if (loading) {
    return <Loading />
  }

  return (
    <StyledNotifications>
      <NotificationHeader>
        <HeaderText>通知</HeaderText>
      </NotificationHeader>

      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
      <PaginationBlock>
        <Pagination
          count={totalPages}
          page={currentPage}
          variant="outlined"
          color="primary"
          size="small"
          onChange={handleChangePage}
        />
      </PaginationBlock>
    </StyledNotifications>
  )
}

const StyledNotifications = styled.div``

const NotificationHeader = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 100;
  border: 1px solid var(--twitter-background);
  padding: 5px 20px;
`

const HeaderText = styled.h2`
  font-size: 20px;
  font-weight: 800;
`

const PaginationBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`
