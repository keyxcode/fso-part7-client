import { createContext, useReducer } from "react";

const notiReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTI":
      return action.payload;
    case "CLEAR_NOTI":
      return null;
    default:
      return state;
  }
};

const NotiContext = createContext();

export const NotiContextProvider = (props) => {
  const [noti, notiDispatch] = useReducer(notiReducer, "hellow world");

  return (
    <NotiContext.Provider value={[noti, notiDispatch]}>
      {props.children}
    </NotiContext.Provider>
  );
};

export default NotiContext;
