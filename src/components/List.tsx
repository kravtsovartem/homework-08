import { Item } from "./Item";

type Props = {
  items: Task[];
  onDelete: (id: Task["id"]) => void;
  onToggle: (id: Task["id"]) => void;
};

export const List = ({ items, onDelete, onToggle }: Props) => {
  const renderItems =
    items.filter((item) => !item.done).length > 10 ? items.slice(0, 10) : items;

  return (
    <ul className="task-list tasks">
      {renderItems.map((item) => (
        <Item {...item} key={item.id} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </ul>
  );
};
