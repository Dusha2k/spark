import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ChannelEntity,
  LocalFileEntity,
  MessageEntity,
  UserEntity,
} from '../api/openAPI';
import { UserStatus } from '../types';

interface InitialState {
  isAuth: boolean;
  id: number;
  nickname: string;
  email: string;
  status: UserStatus;
  avatarId?: number;
  messages?: MessageEntity[];
  channels: ChannelEntity[];
}

const initialState: InitialState = {
  isAuth: false,
  id: 0,
  nickname: '',
  email: '',
  messages: [],
  status: 'offline',
  // TODO: сделать channels в виде объекта что бы обращаться по ключу
  channels: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserEntity>) => {
      const { password, channels, status, ...other } = action.payload;
      return {
        ...other,
        status: status as UserStatus,
        channels: channels ?? [],
        isAuth: true,
      };
    },
    addMessage(state, action: PayloadAction<MessageEntity>) {
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
          channels[channelIndex].members[memberIndex].status =
            action.payload.status;
        }
      }
    },
    changeSelfStatus(state, action: PayloadAction<UserStatus>) {
      state.status = action.payload;
    },
    updateUserAvatar(state, action: PayloadAction<number>) {
      state.avatarId = action.payload;
    },
  },
});

export const {
  addUser,
  addMessage,
  changeUserStatusInChannel,
  changeSelfStatus,
  updateUserAvatar,
} = userSlice.actions;
export default userSlice.reducer;
