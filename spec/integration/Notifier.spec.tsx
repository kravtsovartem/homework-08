import { render, screen } from "@testing-library/react";
import { App } from "src/App";
import { Notifier } from "src/components/Notifier";
import ue from "@testing-library/user-event";
import { JestStoreProvider } from "../utils/JestStoreProvider";

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

describe("Оповещение при выполнении задачи", () => {
  it("появляется и содержит заголовок задачи", async () => {
    const { container } = render(<App />, {
      wrapper: JestStoreProvider,
    });
    const inputEl = screen.getByRole("textbox");
    const addBtnEl = screen.getByAltText(/Добавить/i);

    await userEvent.clear(inputEl);
    await userEvent.type(inputEl, "Первый заголовок");
    await userEvent.click(addBtnEl);

    await userEvent.click(screen.getByLabelText("Первый заголовок"));
    const notifyNode = container.querySelector(".blackout");

    expect(notifyNode).toBeInTheDocument();
  });

  it("одновременно может отображаться только одно", async () => {
    const { container } = render(<App />, {
      wrapper: JestStoreProvider,
    });
    const inputEl = screen.getByRole("textbox");
    const addBtnEl = screen.getByAltText(/Добавить/i);

    for (let i = 0; i < 5; i++) {
      await userEvent.clear(inputEl);
      await userEvent.type(inputEl, "Заголовок " + i);
      await userEvent.click(addBtnEl);
      await userEvent.click(screen.getByLabelText("Заголовок " + i));
    }

    const notifyNode = container.querySelectorAll(".blackout");

    expect(notifyNode).toHaveLength(1);
  });
});
