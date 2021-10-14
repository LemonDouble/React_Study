import { useReducer, useEffect } from "react";
// Custom Hooks 작성

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.error,
      };

    default:
      throw new Error(`Unhandled action type : ${action.type}`);
  }
}

// callback : API 요청을 시작하는 함수
// deps : 해당 함수 안에서만 사용하는 useEffect의 deps
// 이후 비동기 함수에서 파라미터가 필요하고, 그 파라미터가 바뀔 때 새로운 데이터를 불러올 때 사용

function useAsync(callback, deps = [], skip = false) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchData = async () => {
    try {
      // 요청 시작할 때 loading 상태를 true로 바꾼다
      dispatch({ type: "LOADING" });
      const response = await callback();

      //받아온 데이터는 response.data 안에 들어 있다.
      dispatch({ type: "SUCCESS", data: response.data });
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  useEffect(() => {
    if (skip) return;
    fetchData();
    // eslint-disable-next-line
  }, deps);

  // 요청 state, fetchData 함수를 반환
  // fetchData 함수를 통해 쉽게 데이터를 리로딩 할 수 있다.
  return [state, fetchData];
}

export default useAsync;
