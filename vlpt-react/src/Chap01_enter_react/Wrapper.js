import React from "react";

function Wrapper({ children }) {
  const style = {
    border: "2px solid black",
    padding: "16px",
  };

  // children을 렌더링 해 주지 않으면 아래에 있는 컴포넌트들이 보이지 않는다!
  return <div style={style}>{children}</div>;
}

export default Wrapper;
