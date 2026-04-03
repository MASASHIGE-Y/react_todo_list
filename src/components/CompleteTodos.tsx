type Props = {
  todos: string[];
  onClickBack: (index: number) => void;
  onClickDeleteComplete: (index: number) => void;
};

export const CompleteTodos = (props: Props) => {
  const { todos, onClickBack, onClickDeleteComplete } = props;

  return (
          <div className="incomplete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <div className="list-row">
                <input
                  type="checkbox"
                  checked={true}  // 完了リストにいる時は常にチェックあり
                  onClick={ () => {onClickBack(index)}}
                />
                <span>{todo}</span>
                <button onClick={ () => onClickDeleteComplete(index)}>削除</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
  );
};