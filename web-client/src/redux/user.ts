import { createSlice } from "@reduxjs/toolkit";
import { ServerAPI } from "types/openapi";

import { UserConstants } from "types/UserConstants";

export type UserState = {
  id: string;
  email: string;
};

class UserStateLoader {
  loadState(): UserState {
    try {
      const json = localStorage.getItem(UserConstants.JSON);

      if (json) {
        return JSON.parse(json);
      }
    } catch (e) {}
    return this.initializeState();
  }

  saveState(state: UserState) {
    const json = JSON.stringify(state)
    localStorage.setItem(UserConstants.JSON, json);
  }

  clearState() {
    localStorage.removeItem(UserConstants.JSON);
    localStorage.removeItem(UserConstants.Token);
  }

  initializeState(): UserState {
    return {
      id: '',
      email: ''
    };
  }
}

export const userStateLoader = new UserStateLoader();
export const userSlice = createSlice({
  name: 'user',
  initialState: userStateLoader.initializeState(),
  reducers: {
    set: (state, action) => {
      const { id, email } = action.payload as ServerAPI['User'];
      state.id = id;
      state.email = email;

      userStateLoader.saveState(state);
    },
    clear: (state) => {
      state = userStateLoader.initializeState();
      userStateLoader.clearState();
    }
  }
});

export const { set, clear } = userSlice.actions;
export default userSlice.reducer;