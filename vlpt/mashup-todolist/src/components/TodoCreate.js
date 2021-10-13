import React, { useState } from "react";
import styled, { css } from "styled-components";
import { MdAdd } from "react-icons/md";
import { useTodoDispatch, useTodoNextId } from "../TodoContext";

const CircleButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  ${(props) =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

function TodoCreate() {
  // 이 값이 true일땐, 아이콘을 45도 돌려서 X로 바꾸고 빨간색으로 만든다.
  // 또한, 할 일을 입력할 수 있는 폼을 보여준다.
  const [open, setOpen] = useState(false);
  const onToggle = () => setOpen(!open);

  const [value, setValue] = useState("");
  const onChange = (e) => setValue(e.target.value);

  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();
  const onSubmit = (e) => {
    // 새로고침 방지, Submit 기본 기능 제거
    e.preventDefault();
    const newTodo = {
      id: nextId,
      text: value,
      done: false,
    };
    dispatch({ type: "CREATE", todo: newTodo });
    nextId.current += 1;
    //입력창 초기화
    setValue("");
    //열었던거 닫아준다.
    setOpen(false);
  };

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input
              onChange={onChange}
              value={value}
              autoFocus
              placeholder="할 일을 입력 후, Enter를 누르세요"
            />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}
// Props가 변경되지 않았다면 리렌더링을 막아 준다!
// 즉, TodoContext에서 관리하는 State가 바뀔 때, 불필요하게 리렌더링되지 않는다.
export default React.memo(TodoCreate);
