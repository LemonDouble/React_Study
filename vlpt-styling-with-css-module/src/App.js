import "./App.css";
import CheckBox from "./components/CheckBox";
import { useState } from "react";

// Css module : 레거시 프로젝트에 리액트를 도입할 때 / CSS 네이밍 컨벤션을 만들기가 힘들 때

function App() {
  const [check, setCheck] = useState(false);
  const onChange = (e) => {
    setCheck(e.target.checked);
  };

  return (
    <div>
      <CheckBox onChange={onChange} checked={check}>
        다음 약관에 모두 동의
      </CheckBox>
      <p>
        <b>check : </b>
        {check ? "true" : "false"}
      </p>
    </div>
  );
}

export default App;
