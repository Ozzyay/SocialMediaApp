import {createSlice} from "@reduxjs/toolkit"

const initialValue = {
  email: "",
  profile: {},
  posts: []
}

const userSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {
    setData(state, action) {
      state.email = action.payload.email;
      state.profile = action.payload.profile;
      state.posts = action.payload.posts || [];
    },
    clearData(state) {
      state = initialValue;
    },
    deleteOne(state, action) {
      state.posts = state.posts.filter(elem => {
        elem.body !== action.payload
      })
    },
  }
})

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;