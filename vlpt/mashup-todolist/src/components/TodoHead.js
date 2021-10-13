import React from "react";
import styled from "styled-components";
import { useTodoState } from "../TodoContext";
//오늘의 날짜, 요일, 그리고 남은 할 일 개수를 보여준다.

const TodoHeadBlock = styled.div`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #b8bbbf;

  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }
`;

// TodoHeadBlock 내의 day, tasks-left 의 경우 크게 하는 일이 없어 굳이 Component로 분리하지 않았다.
// 취향에 따라 선택할 수 있다!
function TodoHead() {
  const todos = useTodoState();

  // done 값이 False인 값의 개수를 화면에 보여준다.
  const undoneTask = todos.reduce((acc, cur) => {
    return cur.done ? acc + 1 : acc;
  }, 0);

  const today = new Date();
  const dateString = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dayName = today.toLocaleDateString("ko-KR", { weekday: "long" });

  return (
    <TodoHeadBlock>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className="tasks-left">할 일 {undoneTask}개 남음</div>
    </TodoHeadBlock>
  );
}

export default TodoHead;
