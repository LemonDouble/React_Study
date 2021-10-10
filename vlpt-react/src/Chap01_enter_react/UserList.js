import React, { useEffect } from "react";

function User({ user, onRemove, onToggle }) {
  /*
  useEffect(() => {
    console.log("컴포넌트가 화면에 나타남");
    주로 여기서
    1. Props로 받은 값을 컴포넌트의 로컬 상태로 설정
    2. 외부 API 요청 (REST API 등)
    3. 라이브러리 사용 (D3, Video.js등..)
    4. setInterval을 통한 반복작업, 혹은 setTimeout을 통한 작업 예약
    등을 처리
    return () => {
      console.log("컴포넌트가 화면에서 사라짐");
      주로 여기서
      1. setInterval, setTimeout등을 사용하여 등록한 작업을 clear (clearInterval, clearTimeout)
      2. 라이브러리 인스턴스 제거
      등을 한다.
    };
  }, []);
  */

  // 만약 두번째 Parameter (deps Array) 에 넣어주면,
  // 컴포넌트가 처음 마운트될때, 지정한 값이 바뀔 때, 언마운트, 값이 바뀌기 직전에도 호출됨.
  // 만약, useEffect 안에서 사용하는 상태, props가 있다면 useEffect의 deps에 넣어줘야 한다.
  // 그렇게 하지 않으면, useEffect에 등록한 함수가 실행될 때 최신 props / 상태를 가르키지 않게 된다.
  useEffect(() => {
    console.log("user 값이 설정됨");
    console.log(user);
    return () => {
      console.log("user가 바뀌기 전...");
      console.log(user);
    };
  }, [user]);

  /*
  만약 두번째 Parameter (deps Array) 생략하면, 리렌더링 될 때마다 호출된다.
  useEffect(() => {
    console.log(user);
  });
   */

  return (
    <div>
      <b
        style={{
          cursor: "pointer",
          color: user.active ? "green" : "black",
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>{" "}
      <span> ({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default UserList;
