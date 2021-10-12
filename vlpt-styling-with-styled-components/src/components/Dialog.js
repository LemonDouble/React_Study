import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import Button from "./Button";

const fadeIn = keyframes`
from {
  opacity : 0
}
to{
  opacity : 1 
}`;

const fadeOut = keyframes`
from {
  opacity : 1
}
to{
  opacity: 0;
}`;

const slideUp = keyframes`
from{
  transform : translateY(200px);
}
to{
  transform: translateY(0px);
}`;

const slideDown = keyframes`
from {
  transform : translateY(0px);
}to{
  transform: translateY(200px);
}`;

const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  ${(props) =>
    props.disappear &&
    css`
      animation-name: ${fadeOut};
    `}
`;

const DialogBlock = styled.div`
  width: 320px;
  padding: 1.5rem;
  background: white;
  border-radius: 2px;
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.125rem;
  }

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;

  ${(props) =>
    props.disappear &&
    css`
      animation-name: ${slideDown};
    `}
`;

const ButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
`;

// 취소 / 확인 버튼 사이의 간격이 너무 넓어, 해당 간격 사이를 덮어썼다.
// 아래 return 함수에서, 덮어쓴 Component를 렌더링해줘야 한다.
/* 
const MyComponent = ({ className }) => {
  return <div className={className}></div>
};

const ExtendedComponent = styled(MyComponent)`
  background: black;
`;
식으로, className을 통해 전달되는데, 지금은 Button의 ...rest를 통해 전달되고 있다.
*/

const ShortMarginButton = styled(Button)`
  &:not(:first-child) {
    margin-left: 0.5rem;
  }
`;

function Dialog({
  title,
  children,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  visible,
}) {
  // 현재 트랜지션 효과를 보여주고 있는 중인지 관리
  const [animate, setAnimate] = useState(false);
  // 실제로 컴포넌트가 사라지는 시점을 지연
  const [localVisible, setLocalVisible] = useState(visible);

  useEffect(() => {
    // 1. 이 Component가 mount 될때 한번 실행, visible = true 될 때 실행되므로, localVisible = true 된다.
    // 2. confirm이나 cancel 버튼 눌렀을 때, visiable 값이 바뀌므로 실행, 이 때, localVisible = true, !visible은 false 되므로
    // animate를 true로 만들었다 ->  0.25초 뒤에 false 되는 로직 걸어놓고 자신은 false로 바뀐다.
    // 3. 0.25초 후에 animate도 false로 바뀌면, localvisiable : false, animate : false이므로 창이 꺼진다.

    //visible 값이 true -> false 되는 것을 감지
    if (localVisible && !visible) {
      // 현재 애니메이션 보여주는 중!
      setAnimate(true);
      // 0.25초 후, 애니메이션 다 보여준다.
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  if (!animate && !localVisible) return null;

  return (
    <DarkBackground disappear={!visible}>
      <DialogBlock disappear={!visible}>
        <h3>{title}</h3>
        <p>{children}</p>
        <ButtonGroup>
          <ShortMarginButton color="gray" onClick={onCancel}>
            {cancelText}
          </ShortMarginButton>
          <ShortMarginButton color="pink" onClick={onConfirm}>
            {confirmText}
          </ShortMarginButton>
        </ButtonGroup>
      </DialogBlock>
    </DarkBackground>
  );
}

Dialog.defaultProps = {
  confirmText: "확인",
  cancelText: "취소",
};

export default Dialog;
