import React from "react";

function Hello({ color, name, isSpecial }) {
  // const color = "red"
  // {{color}} = 가장 바깥 중괄호는 Javascript 표현 위해서,
  // 실제로는 {color} 인데, const color ="red" 일 때 {color} 하면 {color: 'red'} 객체 만들어 준다.
  return (
    <div style={{ color }}>
      {isSpecial && <b>*</b>}
      안녕하세요 {name}
    </div>
  );
}

// 기본 Props 설정해줄 수 있다.
Hello.defaultProps = {
  name: "이름없음",
};

export default Hello;
