import { createReducer } from "@reduxjs/toolkit";
import TimeActionCreator from "./TimeActionCreator";

const initialSate = {
  currentTime: new Date(),
  isChanging: false,
};

export type HomeStatesType = { currentTime: Date; isChanging: boolean };

// redux-toolkit 적용 전
// const TimeReducer = (
//   state: HomeStatesType = initialSate,
//   action: TimeActionType
// ) => {
//   switch (action.type) {
//     case TIME_ACTION.CHANGE_TIME_REQUEST:
//       return { ...state, isChanging: true };
//     case TIME_ACTION.CHANGE_TIME_COMPLETED:
//       return {
//         ...state,
//         currentTime: action.payload.currentTime,
//         isChanging: false,
//       };
//     default:
//       return state;
//   }
// };

// redux-toolkit 적용 후
const TimeReducer = createReducer(initialSate, (builder) => {
  builder
    .addCase(TimeActionCreator.asyncChangeTime.pending, (state, action) => {
      state.isChanging = true;
    })
    .addCase(TimeActionCreator.asyncChangeTime.fulfilled, (state, action) => {
      state.currentTime = action.payload.currentTime;
      state.isChanging = false;
    });
});

export default TimeReducer;
