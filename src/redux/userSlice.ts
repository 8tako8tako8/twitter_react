import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type UserInfo = {
  email: string
  name?: string
  nickname?: string
  image?: string
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
    setLogin: (state, action: PayloadAction<UserInfo>) => {
      state.isLogined = true
      state.userInfo = action.payload
    },
  },
})

export const { setLogin } = userSlice.actions

export default userSlice.reducer
