import { useContext } from "react";
import NotiContext from "../NotiContext";

const Notification = () => {
  const [noti, notiDispatch] = useContext(NotiContext);
  if (noti === null) return null;

  const { message, type } = noti;

  const notiStyle = {
    color: "green",
    backgroundColor: "lightGrey",
    border: "5px solid green",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  };

  const errorStyle = {
    ...notiStyle,
    color: "red",
    border: "5px solid red",
  };

  return <div style={type === "error" ? errorStyle : notiStyle}>{message}</div>;
};

export default Notification;
