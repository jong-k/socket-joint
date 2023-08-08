import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import s from "./index.module.scss";
import { SERVER_URL } from "../../enums";

const socket = io(SERVER_URL);

export default function ChatRoom() {
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const nickname = location.search.split("?nickname=")[1];
  console.log(nickname);

  const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  const submitMessage = () => {
    console.log(message);
    setMessage("");
  };

  const handleLeaveChatRoom = () => navigate("/", { replace: true });

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("enter", { nickname });
    });
  }, [nickname]);

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div>
          <input
            type="text"
            value={message}
            placeholder="메시지를 입력하세요"
            onChange={handleChangeMessage}
          />
          <button type="button" onClick={submitMessage}>
            전송
          </button>
        </div>
        <div>
          <button type="button" onClick={handleLeaveChatRoom}>
            나가기
          </button>
        </div>
      </div>
    </div>
  );
}
