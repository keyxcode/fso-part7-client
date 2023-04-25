import { useContext } from "react";
import { Alert } from "@mantine/core";
import NotiContext from "../NotiContext";

const Notification = () => {
  const [noti, notiDispatch] = useContext(NotiContext);
  if (noti === null) return null;

  const { message, type } = noti;

  return <Alert color={type === "error" ? "red" : "teal"}>{message}</Alert>;
};

export default Notification;
