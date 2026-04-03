type Props = {
  todoText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
};

export const InputArea = (props: Props) => {
  const { todoText, onChange, onClick } = props;
  return (
      <div className="input-area">
        <input 
          placeholder="TODOを入力" 
          value={todoText} 
          onChange={onChange} 
        />
        <button onClick={onClick}>保存</button>
      </div>
  );
};