import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "./socket";
import s from "./App.module.scss";

export default function App() {
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmitName = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      window.alert("공백은 이름으로 사용할 수 없습니다.");
      return;
    }
    if (activeUsers.includes(name)) {
      window.alert("이미 사용중인 이름입니다.");
      return;
    }
    navigate(`/chatroom?name=${name}`);
  };

  useEffect(() => {
    socket.emit("queryActiveUsers");
    socket.on("activeUsers", (data: string[]) => {
      setActiveUsers(data);
    });
  }, [activeUsers]);

  useEffect(() => {
    socket.on("activeUsers", (data: string[]) => {
      setActiveUsers(data);
    });
  }, [name]);

  return (
    <div className={s.wrapper}>
      <div className={s.enterName}>
        <h1 className={s.title}>hdx chat</h1>
        <h2 className={s.status}>
          현재 접속자 수:{" "}
          <span className={s.activeUserNum}>{activeUsers.length}</span> 명
        </h2>
        <form onSubmit={handleSubmitName}>
          <input
            className={s.nameInput}
            placeholder="사용할 닉네임을 입력하세요"
            type="text"
            name="name"
            value={name}
            onChange={handleChangeName}
          />
          <button className={s.button} type="submit">
            채팅 시작하기
          </button>
        </form>
      </div>
    </div>
  );
}
