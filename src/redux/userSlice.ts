import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type UserInfo = {
  id: number
  email: string
  name: string
  nickname: string
  avatarImageUrl: string
}

type User = {
  isLogined: boolean
  userInfo: UserInfo | null
}

const initialState: User = {
  isLogined: false,
  userInfo: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserInfo>) => {
      state.isLogined = true
      state.userInfo = action.payload
    },
  },
})

export const { setCurrentUser } = userSlice.actions

export default userSlice.reducer
