import React from "react";

function User({ user }) {
  // Null Check, 네트워크 연결을 해서 받아와야 한다거나 하는 경우에, 이런 식으로 사용할 수 있다.
  //if (!user) {
  //  return <div> 로딩 중 ...</div>;
  //}

  return (
    <div>
      <div>
        <b>ID</b> : {user.id}
      </div>
      <div>
        <b>Username</b> : {user.username}
      </div>
    </div>
  );
}

export default User;
