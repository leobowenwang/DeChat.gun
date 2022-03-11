function ChatMessage(props) {
  let message = props.message;
  let sender = props.username;
  const messageClass = message.who === sender ? "sent" : "received";
  const avatar = `https://avatars.dicebear.com/api/initials/${message.who}.svg`;
  const ts = new Date(message.when).toLocaleTimeString();

  return (
    <div className={`message ${messageClass}`}>
      <figure className={`figure figure-${messageClass}`}>
        <img className="avatar" src={avatar} alt="avatar" />
        <figcaption class="figure-caption">{message.who}</figcaption>
      </figure>
      <div className={`message-text-${messageClass}`}>
        <p>{message.what}</p>
        <time className={`time-${messageClass}`}>{ts}</time>
      </div>
    </div>
  );
}

export default ChatMessage;
