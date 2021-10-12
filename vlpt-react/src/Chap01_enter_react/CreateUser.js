import React, { useRef, useContext } from "react";
import useInputs_reducer from "./Hooks/useInputs_reducer";
import { UserDispatch } from "../App";

function CreateUser() {
  const [{ username, email }, onChange, reset] = useInputs_reducer({
    username: "",
    email: "",
  });

  const nextId = useRef(4);
  const dispatch = useContext(UserDispatch);

  const onCreate = () => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    reset();
    nextId.current += 1;
  };

  return (
    <div>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
}

// props가 바뀌지 않았다면 리렌더링을 방지
export default React.memo(CreateUser);
