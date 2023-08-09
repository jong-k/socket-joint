import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "./socket";
import s from "./App.module.scss";

export default function App() {
  const [name, setName] = useState("untitled");
  const [activeUserNum, setActiveUserNum] = useState(0);
  const navigate = useNavigate();

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleSubmitName = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/chatroom?name=${name}`);
  };

  useEffect(() => {
    const onConnect = () => {
      console.log("소켓이 연결되었습니다.");
      socket.on("activeUserNum", (data: string) =>
        setActiveUserNum(JSON.parse(data)),
      );
    };

    socket.on("connect", onConnect);

    return () => {
      socket.off("connect", onConnect);
    };
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.enterName}>
        <h1 className={s.title}>hdx chat</h1>
        <h2 className={s.status}>
          현재 접속자 수:{" "}
          <span className={s.activeUserNum}>{activeUserNum}</span> 명
        </h2>
        <form onSubmit={handleSubmitName}>
          <input
            className={s.nameInput}
            placeholder="사용할 닉네임을 입력하세요"
            type="text"
            name="name"
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
