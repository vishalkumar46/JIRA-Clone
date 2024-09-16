import { createSlice } from "@reduxjs/toolkit";
import { columns } from "../mockData/mockApi";
import { rows } from "../mockData/mockApi";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    columns: columns,
    rows: rows,
    isLoading: true,
  },
  reducers: {
    gettaskList: (state) => {
      state.isLoading = false;
      return state;
    },
    editTask: (state, action) => {
      const taskID = action.payload.task;
      console.log("task", taskID);
      const taskIndex = state.rows.findIndex((item) => item.task == taskID);
      const task = state.rows[taskIndex];

      if (task) {
        task.email = action.payload.email;
        task.status = action.payload.status;
        task.priority = action.payload.priority;
        task.startDate = action.payload.startDate;
        task.endDate = action.payload.endDate;
      }
    },
    deleteTask: (state, action) => {
      const taskID = action.payload.taskID;
      const tasks = state.rows.filter((item) => item.task !== taskID);
      state.rows = tasks;
    },
  },
});

export const task = taskSlice.reducer;
export const { gettaskList, editTask, deleteTask } = taskSlice.actions;
