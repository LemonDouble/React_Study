import React from "react";
import classNames from "classnames";
import "./Button.scss";

// ...rest : 그 이외의 여러 파라미터들, onClick, onRemove등...
// 필요한 함수들을 넣어줄 수 있다.
function Button({ children, size, color, outline, fullWidth, ...rest }) {
  // return <button className={["Button", size].join(" ")}>{children}</button>;
  // classnames 라이브러리를 통해 아래와 같이 간결하게 만들었다.
  return (
    <button
      className={classNames("Button", size, color, { outline, fullWidth })}
      {...rest}
    >
      {children}
    </button>
  );

  // {outline} : outline 속성이 true일때만 "outline" 속성이 추가된다.
}

Button.defaultProps = {
  size: "medium",
  color: "blue",
};

export default Button;
