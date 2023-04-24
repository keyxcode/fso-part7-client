import { useContext } from "react";
import { Notification as MantineNotif } from "@mantine/core";
import NotiContext from "../NotiContext";

const Notification = () => {
  const [noti, notiDispatch] = useContext(NotiContext);
  if (noti === null) return null;

  const { message, type } = noti;

  return (
    <MantineNotif color={type === "error" ? "red" : "teal"}>
      {message}
    </MantineNotif>
  );
};

export default Notification;
