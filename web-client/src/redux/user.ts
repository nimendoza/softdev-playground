import { createSlice } from "@reduxjs/toolkit";
import { ServerAPI } from "types/openapi";
import { http, HttpResponse } from 'utils/http';
import { server } from 'utils/AppConfig';
import { UserEnum } from "utils/UserEnum";

export type UserState = {
  id: string;
  email: string;
};

class UserStateLoader {
  async loadState(): Promise<UserState> {
    try {
      const info = localStorage.getItem(UserEnum.Info);
      const chit = localStorage.getItem(UserEnum.Chit);

      if (info && chit) {
        const payload: ServerAPI['LoginPayload'] = JSON.parse(info);
        const res: HttpResponse<ServerAPI['VerifiedUser']> = await http.post(`${server}/users/verify`, payload);
        if (res.status == 200) {
          console.log('There is info!');
          return JSON.parse(info);
        }
      }
    } catch (e) {}
    return this.initializeState();
  }

  saveState(state: UserState) {
    const json = JSON.stringify({id: state.id, email: state.email});
    localStorage.setItem(UserEnum.Info, json);
  }

  clearState() {
    localStorage.removeItem(UserEnum.Info);
    localStorage.removeItem(UserEnum.Chit);
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
      console.log('Dispatching...');
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