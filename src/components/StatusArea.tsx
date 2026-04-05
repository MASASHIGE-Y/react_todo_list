type Props = {
  allCount: number;
  completeCount: number;
  incompleteCount: number;
};

export const StatusArea = ({
  allCount,
  completeCount,
  incompleteCount,
}: Props) => {
  return (
    <div className="status-area">
      <p>全てのタスク：{allCount}</p>
      <p>完了済み：{completeCount}</p>
      <p>未完了：{incompleteCount}</p>
    </div>
  );
};
