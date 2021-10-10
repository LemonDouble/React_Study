import React, { useRef, useState, useMemo, useCallback } from "react";
import UserList from "./Chap01_enter_react/UserList";
import CreateUser from "./Chap01_enter_react/CreateUser";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는 중 ...");
  return users.filter((user) => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });

  const { username, email } = inputs;

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ]);

  // useCallback 사용할 때, 두번째 파라미터인 deps 배열에 함수 내에서 사용하는 props, state를 넣어줘야 한다!
  // 그렇지 않으면, 해당 값이 항상 최신 값을 참조함을 보장할 수 없다.
  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs]
  );

  const nextId = useRef(4);
  // 이 경우, users.concat을 실행할 때 users가 가장 최신 값을 참조해야 하므로 users를 deps 배열에 넣어주고,
  // username, email도 새로운 user를 만들어 users 배열에 넣는데 필요하므로 deps 배열에 넣어준다.
  // 하지만, inputs의 경우에는 setInputs 함수를 통해 초기화를 할 것이므로 가장 최신의 값을 참고할 필요가 없다.
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers(users.concat(user));

    setInputs({
      username: "",
      email: "",
    });
    nextId.current += 1;
  }, [users, username, email]);

  const onRemove = useCallback(
    (id) => {
      setUsers(users.filter((user) => user.id !== id));
    },
    [users]
  );

  const onToggle = useCallback(
    (id) => {
      setUsers(
        users.map((user) => {
          return user.id === id ? { ...user, active: !user.active } : user;
        })
      );
    },
    [users]
  );

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <div>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성 사용자 수 : {count} </div>
    </div>
  );
}

export default App;
