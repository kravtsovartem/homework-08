import { render, screen } from "@testing-library/react";
import { App } from "src/App";

import ue from "@testing-library/user-event";
import { JestStoreProvider } from "../utils/JestStoreProvider";
import * as taskSliceModule from "src/store/taskSlice";

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

it("Cписок не может содержать больше 10 невыполненных задач", async () => {
  render(<App />);

  const inputEl = screen.getByRole("textbox");
  const addBtnEl = screen.getByAltText(/Добавить/i);

  for (let i = 0; i < 15; i++) {
    await userEvent.type(inputEl, "Задача " + i);
    await userEvent.click(addBtnEl);
  }

  const list = screen.getAllByRole("listitem");

  expect(list).toHaveLength(10);
});
