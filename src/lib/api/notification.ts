import client from './client'

const NOTIFICATIONS_PER_PAGE = 10

export const getNotifications = (currentPage: number) => {
  return client.get(`notifications`, {
    params: {
      limit: NOTIFICATIONS_PER_PAGE,
      offset: currentPage,
    },
  })
}
