type Props = {
  todo: { id: number; content: string; isCompleted: boolean }; // 配列ではなく、単体
  onBack: (id: number) => void;
  onDelete: (id: number) => void;
};

// 名前を単数形に（App.tsxでの呼び出しに合わせる）
export const CompleteTodo = ({ todo, onBack, onDelete }: Props) => {
  return (
    <li>
      <div className="list-row">
        <input
          type="checkbox"
          checked={true}
          onChange={() => onBack(todo.id)}
        />
        <span>{todo.content}</span>
        <button onClick={() => onDelete(todo.id)}>削除</button>
      </div>
    </li>
  );
};
