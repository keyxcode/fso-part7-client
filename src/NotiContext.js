import { createContext, useReducer, useContext } from "react";

const notiReducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS":
      return {
        type: "success",
        message: action.payload,
      };
    case "ERROR":
      return {
        type: "error",
        message: action.payload,
      };
    case "CLEAR":
      return null;
    default:
      return state;
  }
};

const NotiContext = createContext();

export const NotiContextProvider = (props) => {
  const [noti, notiDispatch] = useReducer(notiReducer, null);

  return (
    <NotiContext.Provider value={[noti, notiDispatch]}>
      {props.children}
    </NotiContext.Provider>
  );
};

export const useNotiValue = () => useContext(NotiContext)[0];

export const useNotiDispatch = () => useContext(NotiContext)[1];

export default NotiContext;
