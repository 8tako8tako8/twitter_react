import { MoreVert } from '@mui/icons-material'
import {
  Button,
  ClickAwayListener,
  Grow,
  MenuList,
  Paper,
  Popper,
} from '@mui/material'
import styled from 'styled-components'

type Props = {
  open: boolean
  handleToggle: () => void
  handleClose: (event: Event | React.SyntheticEvent) => void
  handleListKeyDown: (event: React.KeyboardEvent) => void
  anchorRef: React.MutableRefObject<HTMLButtonElement | null>
  children: React.ReactNode
}

export const DropDownMenu: React.FC<Props> = ({
  open,
  handleToggle,
  handleClose,
  handleListKeyDown,
  anchorRef,
  children,
}) => {
  return (
    <StyledDropDownMenu>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <MoreVert />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {children}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </StyledDropDownMenu>
  )
}

const StyledDropDownMenu = styled.div``
