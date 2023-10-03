import React from 'react'
import { TextField } from '@mui/material'
import styled from 'styled-components'

type Props = {
  label: string
  name: string
  value: string
  type: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error: boolean
  helperText?: string
}

export const ProfileDetailModalTextField: React.FC<Props> = ({
  label,
  name,
  value,
  type,
  handleInputChange,
  error,
  helperText,
}) => {
  return (
    <StyledProfileDetailModalTextField>
      <TextField
        fullWidth
        margin="normal"
        label={label}
        name={name}
        value={value}
        type={type}
        InputLabelProps={{ shrink: true }}
        onChange={handleInputChange}
        error={error}
        helperText={helperText}
      />
    </StyledProfileDetailModalTextField>
  )
}

const StyledProfileDetailModalTextField = styled.div``
