import { useRef, useState } from "react";
import "./App.css";
import { TodoInputForm } from "./components/TodoInputForm";
import { TodoStatus } from "./components/TodoStatus";
import { IncompleteTodo } from "./components/IncompleteTodo";
import { CompleteTodo } from "./components/CompleteTodo";

type Todo = {
  id: number;
  content: string;
  isCompleted: boolean;
};

export const App = () => {
  /* ==========================================
   * 1. State（状態）の定義
   * ========================================== */
  // 入力フォームのテキスト
  const [todoText, setTodoText] = useState<string>("");
  // 未完了TODOのリスト&完了TODOのリスト を 1つにまとめる
  const [todos, setTodos] = useState<Todo[]>([]);
  // 編集中のインデックスを管理
  const [editId, setEditId] = useState<number | null>(null);
  // 編集中のテキストを一時保存する
  const [editText, setEditText] = useState<string>("");
  // 追加：次に使うIDを保持。初期値は0
  const nextId = useRef<number>(0);

  /* ==========================================
   * 2. 関数（ロジック）の定義
   * ========================================== */
  // 入力値が変わった時の発火
  const onChangeTodoText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTodoText(event.target.value);

  // 追加ボタンを押した時
  const onClickAdd = () => {
    // trimした値を変数に代入
    const trimmedText = todoText.trim();

    if (trimmedText === "") return;

    const newTodo: Todo = {
      // 今のカウンターの数字をIDにする
      id: nextId.current,
      content: trimmedText, // trimしたものをcontentに代入
      isCompleted: false,
    };

    setTodos([...todos, newTodo]);
    nextId.current += 1; // 使い終わったら、カウンターを1増やす
    setTodoText("");
  };

  // 削除ボタン（未完了ToDo）
  const onClickDelete = (id: number) => {
    const confirmed = window.confirm("本当によろしいですか？");

    if (!confirmed) return; // 早期リターン。キャンセルされたらここで終了

    // クリックされたid以外のものだけ残す。消したいIDと一致しないやつだけ残す
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  // 削除ボタン（完了ToDo）
  const onClickDeleteComplete = (id: number) => {
    const confirmed = window.confirm("本当によろしいですか？");
    if (confirmed) {
      // クリックされたid以外のものだけ残す。消したいIDと一致しないやつだけ残す
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    }
  };

  // 完了と戻す ボタン
  const toggleTodoStatus = (id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        // true falseを反転
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  // 編集ボタン
  const onClickEdit = (id: number, text: string) => {
    setEditId(id);
    setEditText(text); // 今のTODOの文字を初期値として入れる
  };

  // 編集したものを保存するボタン
  const onClickSave = (id: number) => {
    const trimmedText = editText.trim(); // 編集用のstateもtrim
    if (trimmedText === "") return;
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, content: trimmedText };
      }
      return todo;
    });
    setTodos(newTodos);
    setEditId(null);
  };

  return (
    <div className="container">
      {/* 入力エリア */}
      <TodoInputForm
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
      />

      {/* 統計エリア */}
      <TodoStatus
        allCount={todos.length}
        completeCount={todos.filter((t) => t.isCompleted).length}
        incompleteCount={todos.filter((t) => !t.isCompleted).length}
      />

      {/* 未完了&完了リスト */}
      <ul className="todo-list">
        {/* 1. 未完了TODOのエリア */}
        <div className="incomplete-area">
          <p className="title">未完了のTODO</p>
          <ul>
            {todos.map(
              (todo) =>
                !todo.isCompleted && (
                  <IncompleteTodo
                    key={todo.id}
                    todo={todo}
                    onComplete={toggleTodoStatus}
                    onDelete={onClickDelete}
                    editId={editId}
                    editText={editText}
                    onChangeEditText={(e) => setEditText(e.target.value)}
                    onClickEdit={onClickEdit}
                    onClickSave={onClickSave}
                    onCancel={() => setEditId(null)}
                  />
                ),
            )}
          </ul>
        </div>

        {/* 2. 完了TODOのエリア */}
        <div className="complete-area">
          <p className="title">完了のTODO</p>
          <ul>
            {todos.map(
              (todo) =>
                todo.isCompleted && (
                  <CompleteTodo
                    key={todo.id}
                    todo={todo}
                    onDelete={onClickDeleteComplete}
                    onBack={toggleTodoStatus}
                  />
                ),
            )}
          </ul>
        </div>
      </ul>
    </div>
  );
};

export default App;
