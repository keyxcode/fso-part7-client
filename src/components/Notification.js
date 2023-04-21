const Notification = ({ notiInfo }) => {
  const { message, type } = notiInfo;

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

  return <div style={type === "error" ? errorStyle : notiStyle}>{message}</div>;
};

export default Notification;
