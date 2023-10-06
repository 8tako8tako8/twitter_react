import { Alert, AlertColor, Snackbar } from '@mui/material'
import styled from 'styled-components'

type Props = {
  open: boolean
  handleCloseMessage: () => void
  severity?: AlertColor
  children: React.ReactNode
}

export const FlashMessage: React.FC<Props> = ({
  open,
  handleCloseMessage,
  severity = 'success',
  children,
}) => {
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
