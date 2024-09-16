import React from "react";
import { render } from "@testing-library/react";
import TaskList from "./TaskList";
import { Provider } from "react-redux";
import { store } from "../app/store";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));
describe("Greeting", () => {
  it("renders Greeting", () => {
    const component = render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );
    expect(component).toBeDefined();
  });
});
