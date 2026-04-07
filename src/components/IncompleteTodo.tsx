type Props = {
  todo: { id: number; content: string; isCompleted: boolean };
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  // ここから下を追加！
  editId: number | null;
  editText: string;
  onChangeEditText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickEdit: (id: number, text: string) => void;
  onClickSave: (id: number) => void;
  onCancel: () => void;
};

export const IncompleteTodo = ({
  todo,
  onComplete,
  onDelete,
  editId,
  editText,
  onChangeEditText,
  onClickEdit,
  onClickSave,
  onCancel,
}: Props) => {
  return (
    <li>
      <div className="list-row">
        {/* 編集モードか表示モードかで切り替え */}
        {editId === todo.id ? (
          <>
            <input value={editText} onChange={onChangeEditText} />
            <button onClick={() => onClickSave(todo.id)}>保存</button>
            <button onClick={onCancel}>キャンセル</button>
          </>
        ) : (
          <>
            <input
              type="checkbox"
              checked={false}
              onChange={() => onComplete(todo.id)}
            />
            <span>{todo.content}</span>
            <button onClick={() => onClickEdit(todo.id, todo.content)}>
              編集
            </button>
            <button onClick={() => onDelete(todo.id)}>削除</button>
          </>
        )}
      </div>
    </li>
  );
};
