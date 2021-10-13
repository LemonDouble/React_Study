import { useCallback, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        [action.name]: action.value,
      };
    case "RESET":
      return {
        username: "",
        email: "",
      };
    default:
      return state;
  }
}

// Custom Hooks
function useInputs_reducer(initialForm) {
  const [inputs, dispatch] = useReducer(reducer, {
    username: "",
    email: "",
  });

  //change
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE",
      name: name,
      value: value,
    });
  }, []);

  const reset = useCallback(
    () =>
      dispatch({
        type: "RESET",
      }),
    []
  );
  return [inputs, onChange, reset];
}

export default useInputs_reducer;
