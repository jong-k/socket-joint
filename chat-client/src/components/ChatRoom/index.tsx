import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { socket } from "../../socket";
import s from "./index.module.scss";

export default function ChatRoom() {
  const [message, setMessage] = useState("");
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.search.split("?name=")[1];

  const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  const submitMessage = () => {
    console.log(message);
    setMessage("");
  };

  const handleLeaveChatRoom = () => {
    const newActiveUsers = activeUsers.filter((user) => user !== name);
    setActiveUsers(newActiveUsers);
    socket.emit("leave", name);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const onConnect = () => {
      console.log(`${name} 님이 채팅을 시작했습니다.`);
      socket.emit("enter", name);
    };

    // const onDisconnect = () => {
    //   console.log("소켓 연결이 해제되었습니다.");
    // };

    // const onLeave = () => {
    //   console.log(`${name} 님이 채팅을 종료했습니다.`);

    //   socket.emit("leave", name);
    // };

    socket.on("connect", onConnect);

    return () => {
      socket.off("connect", onConnect);
    };
  }, []);

  useEffect(() => {
    // state update
    if (!activeUsers.includes(name)) {
      setActiveUsers((prev) => [...prev, name]);
    }
    const onActiveUsers = (data: string) => {
      console.log("접속중인 유저 정보가 업데이트되었습니다.");
      setActiveUsers(JSON.parse(data));
    };

    socket.on("activeUsers", onActiveUsers);

    return () => {
      socket.off("activeUsers", onActiveUsers);
    };
  }, [activeUsers]);

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div>
          <div>
            <p>메시지</p>
            <p>메시지</p>
            <p>메시지</p>
            <p>메시지</p>
            <p>메시지</p>
            <p>메시지</p>
            <p>메시지</p>
          </div>
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
        </div>
        <div>
          <h2>현재 참여중인 사람</h2>
          <div>
            {activeUsers.map((user, idx) => (
              <p key={idx}>{user}</p>
            ))}
          </div>
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
