import { useState } from "react";
import "./App.css";
import { InputArea } from "./components/InputArea";
import { StatusArea } from "./components/StatusArea";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  /* ==========================================
   * 1. State（状態）の定義
   * ========================================== */
  // 入力フォームのテキスト
  const [todoText, setTodoText] = useState<string>("");
  // 未完了TODOのリスト
  const [incompleteTodos, setIncompleteTodos] = useState<string[]>([]);
  // 完了TODOのリスト
  const [completeTodos, setCompleteTodos] = useState<string[]>([]);
  // 編集中のインデックスを管理
  const [editIndex, setEditIndex] = useState<number>(-1);
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
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  // 削除ボタン（未完了ToDo）
  const onClickDelete = (index: number) => {
    const confirmed = window.confirm("本当によろしいですか？");
    if (confirmed) {
      const newTodos = [...incompleteTodos];
      newTodos.splice(index, 1);
      setIncompleteTodos(newTodos);
    }
  };

  // 削除ボタン（完了ToDo）
  const onClickDeleteComplete = (index: number) => {
    const confirmed = window.confirm("本当によろしいですか？");
    if (confirmed) {
      const newTodos = [...completeTodos];
      newTodos.splice(index, 1);
      setCompleteTodos(newTodos);
    }
  };

  // 完了ボタン
  const onClickComplete = (index: number) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  // 未完了のTodoへ戻る
  const onClickBack = (index: number) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  // 編集ボタン
  const onClickEdit = (index: number, text: string) => {
    setEditIndex(index);
    setEditText(text);  // 今のTODOの文字を初期値として入れる
  };

  // 編集したものを保存するボタン
  const onClickSave = (index: number) => {
    if (editText === "") return;
    const newTodos = [...incompleteTodos];
    newTodos[index] = editText;
    setIncompleteTodos(newTodos);
    setEditIndex(-1);
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
        editIndex={editIndex}
        editText={editText}
        setEditText={setEditText}
        onClickSave={onClickSave}
        setEditIndex={setEditIndex}
        onClickComplete={onClickComplete}
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
      />

      {/* 完了リスト */}
      <CompleteTodos
        todos={completeTodos}
        onClickBack={onClickBack}
        onClickDeleteComplete={onClickDeleteComplete}
      />
    </div>
  );
};

export default App;