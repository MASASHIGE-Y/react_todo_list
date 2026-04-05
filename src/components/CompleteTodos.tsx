type Props = {
  todos: { id: number; content: string; isCompleted: boolean }[];
  onClickBack: (id: number) => void;
  onClickDeleteComplete: (id: number) => void;
};

export const CompleteTodos = ({
  todos,
  onClickBack,
  onClickDeleteComplete,
}: Props) => {
  return (
    <div className="complete-area">
      <p className="title">完了のTODO</p>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div className="list-row">
              <input
                type="checkbox"
                checked={true} // 完了リストにいる時は常にチェックあり
                onChange={() => {
                  onClickBack(todo.id);
                }}
              />
              <span>{todo.content}</span>
              <button onClick={() => onClickDeleteComplete(todo.id)}>
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
