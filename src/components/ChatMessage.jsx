function ChatMessage(props) {
  let message = props.message;
  let sender = props.username;
  const messageClass = message.who === sender ? "sent" : "received";
  const avatar = `https://avatars.dicebear.com/api/initials/${message.who}.svg`;
  const ts = new Date(message.when);

  return (
    <div className={`message ${messageClass}`}>
      <img
        className={`avatar avatar-${messageClass}`}
        src={avatar}
        alt="avatar"
      />
      <div className={`message-text-${messageClass}`}>
        <p>{message.what}</p>
        <time className={`time-${messageClass}`}>
          {ts.toLocaleTimeString()}
        </time>
      </div>
    </div>
  );
}

export default ChatMessage;
