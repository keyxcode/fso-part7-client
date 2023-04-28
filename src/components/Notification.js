import { useSelector } from "react-redux";

const Notification = () => {
  const { message, type } = useSelector(({ notification }) => notification);
  console.log(message);

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

  if (message === null) return null;

  return <div style={type === "ERROR" ? errorStyle : notiStyle}>{message}</div>;
};

export default Notification;
