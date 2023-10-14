import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { Comment } from './Comment'
import { Pagination } from '@mui/material'
import { getComments } from '../../lib/api/comment'
import { useNavigate, useParams } from 'react-router-dom'
import { Loading } from '../pages/Loading'

type Comment = {
  id: number
  user: {
    id: string
    name: string
    nickname: string
    avatarImageUrl: string
  }
  comment: string
}

export const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const { tweetId } = useParams()
  const navigate = useNavigate()

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page)
    navigate({ ...location, search: `?page=${page}` })
    handleGetComments(Number(tweetId), page)
  }

  const handleGetComments = (tweetId: number, page: number) => {
    setLoading(true)

    getComments(tweetId, page)
      .then((res) => {
        if (res && res.data) {
          setTotalPages((res.data.pagination.totalPages as number) || 1)
          const resComments: Comment[] = res.data.comments as Comment[]
          setComments(resComments)
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
    handleGetComments(Number(tweetId), page)
  }, [location.search])

  if (loading) {
    return <Loading />
  }

  return (
    <StyledComments>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      <PaginationBlock className="pagination">
        <Pagination
          count={totalPages}
          page={currentPage}
          variant="outlined"
          color="primary"
          size="small"
          onChange={handleChangePage}
        />
      </PaginationBlock>
    </StyledComments>
  )
}

const StyledComments = styled.div``

const PaginationBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`
