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
  // TODO: сделать channels в виде объекта что бы обращаться по ключу
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
      console.log(action.payload);
      const channelIndex = state.channels.findIndex(
        (channel) => channel.id === action.payload.channel.id,
      );
      if (channelIndex !== -1) {
        state.channels[channelIndex].messages.push(action.payload);
      }
    },
    changeUserStatusInChannel(
      { channels },
      action: PayloadAction<{
        id: number;
        channelId: number;
        status: 'offline' | 'online';
      }>,
    ) {
      const channelIndex = channels.findIndex(
        (channel) => channel.id === action.payload.channelId,
      );
      if (channelIndex !== -1) {
        const memberIndex = channels[channelIndex].members.findIndex(
          (member) => member.id === action.payload.id,
        );
        if (memberIndex !== -1) {
          console.log(action.payload.status);
          channels[channelIndex].members[memberIndex].status =
            action.payload.status;
        }
      }
    },
  },
});

export const { addUser, addMessage, changeUserStatusInChannel } =
  userSlice.actions;
export default userSlice.reducer;
