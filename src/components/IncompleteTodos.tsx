type Props = {
  todos: { id: number; content: string; isCompleted: boolean }[]; //オブジェクトの配列
  editId: number | null;
  editText: string;
  setEditText: (value: string) => void;
  onClickSave: (id: number) => void;
  setEditId: (id: number | null) => void;
  onClickComplete: (id: number) => void;
  onClickEdit: (id: number, text: string) => void;
  onClickDelete: (id: number) => void;
};

export const IncompleteTodos = ({
  todos,
  editId,
  editText,
  setEditText,
  onClickSave,
  setEditId,
  onClickComplete,
  onClickEdit,
  onClickDelete,
}: Props) => {
  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div className="list-row">
              {editId === todo.id ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => onClickSave(todo.id)}>保存</button>
                  <button onClick={() => setEditId(null)}>キャンセル</button>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={false} // 未完了リストにいる時は常にチェックなし
                    onChange={() => onClickComplete(todo.id)}
                  />
                  <span>{todo.content}</span>
                  <button onClick={() => onClickEdit(todo.id, todo.content)}>
                    編集
                  </button>
                  <button onClick={() => onClickDelete(todo.id)}>削除</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
