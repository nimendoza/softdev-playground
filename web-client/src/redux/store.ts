import { configureStore } from "@reduxjs/toolkit";

import userReducer, { UserState, userStateLoader } from './user';

export type ReduxState = {
  user: UserState;
};

export default configureStore({
  reducer: {
    user: userReducer
  },
  preloadedState: {
    user: await userStateLoader.loadState()
  }
});
