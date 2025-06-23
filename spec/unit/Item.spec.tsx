import { prettyDOM, render, screen } from "@testing-library/react";
import { Item } from "src/components/Item";

import ue from "@testing-library/user-event";

describe("Элемент списка задач", () => {
  it("название не должно быть больше 32 символов", () => {
    const item: Task = {
      id: "1",
      header: "Пример заголовка, содержащего больше 32 символов", // Пример заголовка, содержащего больше 32 символов
      done: true,
    };

    const { container } = render(
      <Item {...item} onDelete={() => {}} onToggle={() => {}} />
    );

    const headerNode = container.querySelector(`[for="${item.id}"]`);
    expect(headerNode?.textContent?.length).toBeLessThanOrEqual(32);
  });
  it("название не должно быть пустым", () => {
    const item: Task = {
      id: "1",
      header: "Пример заголовка, содержащего", // Пример заголовка, содержащего больше 32 символов
      done: true,
    };

    const { container } = render(
      <Item {...item} onDelete={() => {}} onToggle={() => {}} />
    );

    const headerNode = container.querySelector(`[for="${item.id}"]`);
    expect(headerNode?.textContent?.length).toBeGreaterThan(0);
  });
  it("нельзя удалять невыполненные задачи", async () => {
    const item: Task = {
      id: "1",
      header: "Пример заголовка, содержащего", // Пример заголовка, содержащего больше 32 символов
      done: false,
    };

    render(<Item {...item} onDelete={() => {}} onToggle={() => {}} />);

    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });
  it("название должно быть зачёркнутым для завершеных задач", () => {
    const item: Task = {
      id: "1",
      header: "Пример заголовка, содержащего", // Пример заголовка, содержащего больше 32 символов
      done: true,
    };

    const { container } = render(
      <Item {...item} onDelete={() => {}} onToggle={() => {}} />
    );

    const headerNode = container.querySelector(`[for="${item.id}"]`);

    expect(headerNode?.querySelector("s")).not.toBeEmptyDOMElement();
  });

  it("checkbox должен быть отмечен для завершенных задач", () => {
    const item: Task = {
      id: "1",
      header: "Пример заголовка, содержащего", // Пример заголовка, содержащего больше 32 символов
      done: true,
    };

    render(<Item {...item} onDelete={() => {}} onToggle={() => {}} />);

    const checkboxNode = screen.getByRole("checkbox");

    expect(checkboxNode).toBeChecked();
  });
});
