type Props = {
  todos: string[];
  editIndex: number;
  editText: string;
  setEditText: (value: string) => void;
  onClickSave: (index: number) => void;
  setEditIndex: (index: number) => void;
  onClickComplete: (index: number) => void;
  onClickEdit: (index: number, text: string) => void;
  onClickDelete: (index: number) => void;
};

export const IncompleteTodos = (props: Props) => {
  const { todos, editIndex, editText, setEditText, onClickSave, setEditIndex, onClickComplete, onClickEdit, onClickDelete } = props;

  return (
    <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <div className="list-row">
                {editIndex === index ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={ () => onClickSave(index)}>保存</button>
                  <button onClick={ () => setEditIndex(-1)}>キャンセル</button>
                </>
                ) : (
                <>
                  <input
                    type="checkbox"
                    checked={false}  // 未完了リストにいる時は常にチェックなし
                    onChange={ () => onClickComplete(index)}
                  />
                  <span>{todo}</span>
                  <button onClick={ () => onClickEdit(index, todo)}>編集</button>
                  <button onClick={ () => onClickDelete(index)}>削除</button>
                </>
              )}
              </div>
            </li>
          ))}
        </ul>
      </div>
  );
};