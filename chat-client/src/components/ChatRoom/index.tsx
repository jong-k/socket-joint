import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { socket } from "../../socket";
import s from "./index.module.scss";

export default function ChatRoom() {
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const name = decodeURI(location.search.split("?name=")[1]);
  const navigate = useNavigate();

  const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  const handleSubmitMessage = (e: FormEvent) => {
    e.preventDefault();
    const newMessage = { author: name, content: message };
    socket.emit("addMessage", newMessage, () => {
      setMessages((prev) => [...prev, newMessage]);
    });
    setMessage("");
  };

  const handleClickLeave = () => {
    socket.emit("leave", name);
    navigate("/");
  };

  useEffect(() => {
    socket.emit("enter", name, () => setActiveUsers((prev) => [...prev, name]));
  }, []);

  useEffect(() => {
    socket.on("messages", (data: Message[]) => setMessages(data));
  }, [messages.length]);

  useEffect(() => {
    socket.on("activeUsers", (data: string[]) => {
      setActiveUsers(data);
    });
  }, [activeUsers]);

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.main}>
          <div className={s.chat}>
            <div>
              {messages.map((message, idx) =>
                message.author === name ? (
                  <div key={idx} className={s.messageContainer}>
                    <p className={s.author}>{message.author} (나):</p>
                    <p className={s.message}>{message.content}</p>
                  </div>
                ) : (
                  <div key={idx} className={s.messageContainer}>
                    <p className={s.author}>{message.author}:</p>
                    <p className={s.message}>{message.content}</p>
                  </div>
                ),
              )}
            </div>
            <form onSubmit={handleSubmitMessage}>
              <input
                type="text"
                value={message}
                placeholder="메시지를 입력하세요"
                onChange={handleChangeMessage}
              />
              <button type="submit">전송</button>
            </form>
          </div>
          <div className={s.userList}>
            <h2>현재 참여중인 사람</h2>
            <div>
              {activeUsers.map((user, idx) =>
                user === name ? (
                  <p key={idx}>{user} (나)</p>
                ) : (
                  <p key={idx}>{user}</p>
                ),
              )}
            </div>
          </div>
        </div>

        <div className={s.leaveButtonBox}>
          <button
            type="button"
            className={s.leaveButton}
            onClick={handleClickLeave}
          >
            나가기
          </button>
        </div>
      </div>
    </div>
  );
}
