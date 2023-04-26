import { Alert } from "@mantine/core";
import { useNotiValue } from "../NotiContext";

const Notification = () => {
  const noti = useNotiValue();
  if (noti === null) return null;

  const { message, type } = noti;

  return <Alert color={type === "error" ? "red" : "teal"}>{message}</Alert>;
};

export default Notification;
