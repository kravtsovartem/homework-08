import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "src/components/Empty";
import { List } from "src/components/List";
import {
  deleteTask,
  isShowClosedTask,
  tasksSelector,
  toggleTask,
} from "src/store/taskSlice";

export const TaskList = () => {
  const items = useSelector(tasksSelector);
  const dispatch = useDispatch();

  const showClosedTask = useSelector(isShowClosedTask);

  const computedList = useMemo(() => {
    return showClosedTask ? items.filter((item) => item.done) : items;
  }, [items, showClosedTask]);

  const handleDelete = (id: Task["id"]) => {
    dispatch(deleteTask(id));
  };

  const handleToggle = (id: Task["id"]) => {
    dispatch(toggleTask(id));
  };

  return computedList.length > 0 ? (
    <List
      items={computedList}
      onDelete={handleDelete}
      onToggle={handleToggle}
    />
  ) : (
    <Empty />
  );
};
