type Props = {
  todoText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
};

export const InputArea = ({ todoText, onChange, onClick }: Props) => {
  return (
    <div className="input-area">
      <input placeholder="TODOを入力" value={todoText} onChange={onChange} />
      <button onClick={onClick}>保存</button>
    </div>
  );
};
