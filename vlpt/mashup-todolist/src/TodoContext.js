import React, { useReducer, createContext, useContext, useRef } from "react";

const initialTodos = [
  {
    id: 1,
    text: "프로젝트 생성하기",
    done: true,
  },
  {
    id: 2,
    text: "컴포넌트 스타일링하기",
    done: true,
  },
  {
    id: 3,
    text: "Context 만들기",
    done: false,
  },
  {
    id: 4,
    text: "기능 구현하기",
    done: false,
  },
];

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo);
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action Type : ${action.type}`);
  }
}

// State와 Dispatch Provider를 쪼갬으로써, Dispatch만 필요한 Component가 State에 의해 불필요하게 재렌더링하지 않도록 한다.
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}
/* 
import { TodoStateContext, TodoDispatchContext } from '../TodoContext';
function Sample() {
  const state = useContext(TodoStateContext);
  const dispatch = useContext(TodoDispatchContext);
  ...
와 같이 쓸 수 있다.
*/

// Custom Hooks로 좀 더 편하게 사용할 수 있다.
export function useTodoState() {
  const context = useContext(TodoStateContext);

  //만약 TodoProvider 안이 아니라면 에러 발생
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }

  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);

  //만약 TodoProvider 안이 아니라면 에러 발생
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }

  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);

  //만약 TodoProvider 안이 아니라면 에러 발생
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }

  return context;
}

/*
import { useTodoState, useTodoDispatch } from '../TodoContext';
function Sample() {
  const state = useTodoState();
  const dispatch = useTodoDispatch();
  ...

  과 같이 좀 더 간편하게 사용할 수 있다!
*/
