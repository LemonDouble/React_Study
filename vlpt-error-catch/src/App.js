import User from "./User";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  const user = {
    id: 1,
    username: "velopert",
  };

  // 고의로 Props를 전달하지 않아서 Error를 발생시켰다!
  // 실제 환경에선, 아무것도 렌더링되지 않고 흰 페이지만 나타난다.
  return (
    <ErrorBoundary>
      <User />
    </ErrorBoundary>
  );
}

export default App;
