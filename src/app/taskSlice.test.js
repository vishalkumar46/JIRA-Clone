import { gettaskList, editTask, deleteTask, task } from "./taskSlice";
import { columns, rows } from "../mockData/mockApi";

describe("taskSlice", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      columns: columns,
      rows: rows,
      isLoading: true,
    };
  });

  it("should handle initial state", () => {
    const listSliceInit = task(initialState, { type: "gettaskList" });
    expect(listSliceInit).toBe(initialState);
  });
  it("should handle edit state", () => {
    const listSliceInit = task(initialState, {
      type: "editTask",
      action: {
        task: 2,
        email: "user2@gmail.com",
        status: "In-progress",
        priority: "Low",
        startDate: "09-25-2024",
        endDate: "09-28-2024",
      },
    });
    expect(listSliceInit).toBe(initialState);
  });
});
