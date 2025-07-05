import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser: null,
    error:null,
    loading:null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateProfileStart:(state)=>{
            state.loading=true,
            state.error = null;
        },
        updateProfileSuccess:(state,action)=>{
            state.loading=false,
            state.error = null;
            state.currentUser=action.payload
        },
        updateProfileFailure:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        },
        deleteProfileStart:(state)=>{
            state.loading=true,
            state.error = null;
        },
        deleteProfileSuccess:(state)=>{
            state.loading=false,
            state.error = null;
            state.currentUser=null
        },
        deleteProfileFailure:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        },
        signoutUserSuccess:(state)=>{
            state.loading=false,
            state.currentUser=null
        },
        signoutUserFailure:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        }
    }
});

export const { signInStart, signInSuccess, signInFailure,updateProfileStart,updateProfileSuccess,updateProfileFailure,deleteProfileStart,deleteProfileSuccess,deleteProfileFailure,signoutUserFailure,signoutUserSuccess } = userSlice.actions;
export default userSlice.reducer;