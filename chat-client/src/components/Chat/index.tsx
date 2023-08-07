import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import io from "socket.io-client";
import s from "./index.module.scss";
import Message from "../Message";

const socket = io("localhost:3000");

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on("enter", (welcomeMessage) => {
      console.log(welcomeMessage);
    });
    socket.on("receiveMessage", (message) => {
      console.log(message);
      setMessages([...messages, message]);
    });
    return () => socket.off("receiveMessage");
  }, [messages]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    socket.emit("sendMessage", message);
    setMessage("");
  };

  return (
    <div className={s.container}>
      <div className={s.rectangle}>
        <div className={s.messages}>
          <h1>Messages</h1>
          {messages.map((message, i) => (
            <Message key={i} message={message} />
          ))}
        </div>

        <form className={s.form} action="">
          <input
            className={s.commonSearchTerm}
            type="text"
            placeholder="Message"
            value={message}
            onChange={handleChange}
          />
          <button
            className={s.searchButton}
            type="submit"
            onClick={sendMessage}
          >
            전송
          </button>
        </form>
      </div>
    </div>
  );
}
