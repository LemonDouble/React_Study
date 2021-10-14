import React, { useState } from "react";
import axios from "axios";
import useAsync from "./useAsync";
import User from "./User";

const getUsers = async () =>
  await axios.get("https://jsonplaceholder.typicode.com/users");

function Users() {
  const [state, refetch] = useAsync(getUsers, [], true);
  const { loading, error, data: users } = state;

  const [userId, setUserId] = useState(null);

  if (loading) return <div>로딩 중..</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!users) return <button onClick={refetch}> 데이터 불러오기 </button>;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => setUserId(user.id)}
            style={{ cursor: "pointer" }}
          >
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={refetch}> 다시 불러오기 </button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;
