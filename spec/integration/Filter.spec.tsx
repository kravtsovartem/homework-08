import {
  getByLabelText,
  prettyDOM,
  render,
  screen,
} from "@testing-library/react";
import ue from "@testing-library/user-event";
import { App } from "src/App";

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

describe("Список задач", () => {
  it("Создание задач", async () => {
    render(<App />);
    const inputEl = screen.getByRole("textbox");
    const addBtnEl = screen.getByAltText(/Добавить/i);

    const tasks = [
      {
        name: "Первый заголовок",
        done: true,
      },
      {
        name: "Второй заголовок",
        done: true,
      },
      {
        name: "Третий заголовок",
        done: false,
      },
    ];

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      await userEvent.clear(inputEl);
      await userEvent.type(inputEl, task.name);
      await userEvent.click(addBtnEl);

      const taskEl = screen.getByLabelText(task.name);

      if (task.done) await userEvent.click(taskEl);
    }
  });

  // не содержит выполненные задачи
  // после нажатия на кнопку фильтрации
  it("с включенным фильтром", async () => {
    render(<App />);

    const items = screen.getAllByRole("listitem");

    //screen.debug();
    expect(items).toHaveLength(3);
  });

  // показывает как выполненные, так и не выполненные задачи
  // после повторного нажатия на кнопку фильтрации
  it("с выключенным фильтром", async () => {
    render(<App />);

    const items = screen.getAllByRole("listitem");

    //screen.debug();
    expect(items).toHaveLength(3);
  });
});
