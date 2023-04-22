import { useContext } from "react";
import NotiContext from "../NotiContext";

const Notification = ({ notiInfo }) => {
  const { message, type } = notiInfo;
  const [noti, dispatch] = useContext(NotiContext);

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

  // if (message === null) return null;

  return <div style={type === "error" ? errorStyle : notiStyle}>{noti}</div>;
};

export default Notification;
