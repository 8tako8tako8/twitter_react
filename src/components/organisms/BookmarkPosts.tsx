/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pagination } from '@mui/material'
import styled from 'styled-components'
import { Loading } from '../pages/Loading'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getBookmarks } from '../../lib/api/bookmark'
import { Post } from './Post'

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
  isBookmarked: boolean
  retweets: number
  favorites: number
}

export const BookmarkPosts: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Post[]>([])
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
    handleGetBookmarks(page)
  }

  const handleGetBookmarks = (page: number) => {
    setLoading(true)

    getBookmarks(page)
      .then((res) => {
        if (res && res.data) {
          setTotalPages((res.data.pagination.totalPages as number) || 1)
          const resBookmarks: Post[] = res.data.bookmarks
          setBookmarks(resBookmarks)
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
    handleGetBookmarks(page)
  }, [location.search])

  if (loading) {
    return <Loading />
  }

  return (
    <StyledBookmarkPosts>
      <BookmarkHeader>
        <HeaderText>ブックマーク</HeaderText>
      </BookmarkHeader>

      {bookmarks.map((bookmark) => (
        <Post key={bookmark.id} post={bookmark} myself={false} />
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
    </StyledBookmarkPosts>
  )
}

const StyledBookmarkPosts = styled.div``

const BookmarkHeader = styled.div`
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
