import { useState } from "react";
import "./App.css";
import { InputArea } from "./components/InputArea";
import { StatusArea } from "./components/StatusArea";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

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
  // todosの中から、isCompleted が false のものだけを取り出す
  const incompleteTodos = todos.filter((todo) => !todo.isCompleted);
  // todosの中から、isCompleted が true のものだけを取り出す
  const completeTodos = todos.filter((todo) => todo.isCompleted);
  // 編集中のインデックスを管理
  const [editId, setEditId] = useState<number | null>(null);
  // 編集中のテキストを一時保存する
  const [editText, setEditText] = useState<string>("");

  /* ==========================================
   * 2. 関数（ロジック）の定義
   * ========================================== */
  // 入力値が変わった時の発火
  const onChangeTodoText = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTodoText(event.target.value);

  // 追加ボタンを押した時
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodo: Todo = {
      // もしToDoリストが空じゃないなら、一番最後のtodoのIDに+1した数字を新しいIDに、もしリストが空（最初の一件）なら、IDは0に
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 0,
      content: todoText,
      isCompleted: false,
    };

    setTodos([...todos, newTodo]);
    setTodoText("");
  };

  // 削除ボタン（未完了ToDo）
  const onClickDelete = (id: number) => {
    const confirmed = window.confirm("本当によろしいですか？");
    if (confirmed) {
      // クリックされたid以外のものだけ残す。消したいIDと一致しないやつだけ残す
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    }
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
    if (editText === "") return;
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, content: editText };
      }
      return todo;
    });
    setTodos(newTodos);
    setEditId(null);
  };

  return (
    <div className="container">
      {/* 入力エリア */}
      <InputArea
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
      />

      {/* 統計エリア */}
      <StatusArea
        allCount={incompleteTodos.length + completeTodos.length}
        completeCount={completeTodos.length}
        incompleteCount={incompleteTodos.length}
      />

      {/* 未完了リスト */}
      <IncompleteTodos
        todos={incompleteTodos}
        editId={editId}
        editText={editText}
        setEditText={setEditText}
        onClickSave={onClickSave}
        setEditId={setEditId}
        onClickComplete={toggleTodoStatus}
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
      />

      {/* 完了リスト */}
      <CompleteTodos
        todos={completeTodos}
        onClickBack={toggleTodoStatus}
        onClickDeleteComplete={onClickDeleteComplete}
      />
    </div>
  );
};

export default App;
