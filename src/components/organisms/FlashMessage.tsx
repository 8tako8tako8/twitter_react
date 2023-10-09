import { Alert, AlertColor, Snackbar } from '@mui/material'
import styled from 'styled-components'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  severity?: AlertColor
  children: React.ReactNode
}

export const FlashMessage: React.FC<Props> = ({
  open,
  setOpen,
  severity = 'success',
  children,
}) => {
  const handleCloseMessage = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <StyledFlashMessage>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseMessage}
      >
        <Alert
          onClose={handleCloseMessage}
          severity={severity}
          sx={{ width: '100%' }}
        >
          {children}
        </Alert>
      </Snackbar>
    </StyledFlashMessage>
  )
}

const StyledFlashMessage = styled.div``
