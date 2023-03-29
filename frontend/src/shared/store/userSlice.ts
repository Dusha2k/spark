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
    addMessage(state, action: PayloadAction<MessageEntity>) {
      console.log(action.payload)
      const channelIndex = state.channels.findIndex(
        (channel) => channel.id === action.payload.channel.id,
      );
      if (channelIndex !== -1) {
        state.channels[channelIndex].messages.push(action.payload);
      }
    },
  },
});

export const { addUser, addMessage } = userSlice.actions;
export default userSlice.reducer;
