import { useDispatch, useSelector } from "react-redux";
import { isShowClosedTask, toggleFilterClosedTask } from "src/store/taskSlice";

export const Filter = () => {
  const dispatch = useDispatch();
  const showClosedTask = useSelector(isShowClosedTask);

  const handleClickFilter = () => {
    dispatch(toggleFilterClosedTask());
  };

  return (
    <div>
      <span>Закрытые задачи</span>
      <input
        type="checkbox"
        onChange={handleClickFilter}
        checked={showClosedTask}
        data-testid="filter__show_closed_task"
      />
    </div>
  );
};
