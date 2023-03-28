import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChannelEntity, MessageEntity, UserEntity } from '../api/openAPI';

interface InitialState {
  isAuth: boolean;
  id: number;
  login: string;
  email: string;
  avatar?: string;
  messages: MessageEntity[];
  channels: ChannelEntity[];
}

const initialState: InitialState = {
  isAuth: false,
  id: 0,
  login: '',
  email: '',
  messages: [],
  channels: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserEntity>) => {
      const { password, ...other } = action.payload;
      return {
        ...other,
        isAuth: true,
      };
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
