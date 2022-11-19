import { createSlice } from "@reduxjs/toolkit";
import { ServerAPI } from "types/openapi";
import { http, HttpResponse } from 'utils/http';

export type UserState = {
  id: string;
  email: string;
};

class UserStateLoader {
  async loadState(): Promise<UserState> {
    try {
      const info = localStorage.getItem(UserInfo);
      const chit = localStorage.getItem(UserChit);

      if (info && chit) {
        const payload: ServerAPI['LoginPayload'] = JSON.parse(info);
        const res: HttpResponse<ServerAPI['VerifiedUser']> = await http.post(`${server}/V1/users/verify`, payload)
        if (res.status == 200) {
          return JSON.parse(info);
        }
      }
    } catch (e) {}
    return this.initializeState();
  }

  saveState(state: UserState) {
    const json = JSON.stringify(state)
    localStorage.setItem(UserInfo, json);
  }

  clearState() {
    localStorage.removeItem(UserInfo);
    localStorage.removeItem(UserChit);
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
    clear: (_state) => {
      _state = userStateLoader.initializeState();
      userStateLoader.clearState();
    }
  }
});

export const { set, clear } = userSlice.actions;
export default userSlice.reducer;