import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import s from "./App.module.scss";

export default function App() {
  const [name, setName] = useState("untitled");

  const handleChangeNickname = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  return (
    <div className={s.wrapper}>
      <div className={s.enterName}>
        <h1 className={s.title}>hdx chat</h1>
        <h2 className={s.status}>
          현재 참여중인 사람: <span className={s.activeUserNum}>0</span> 명
        </h2>
        <div>
          <input
            className={s.nameInput}
            placeholder="사용할 닉네임을 입력하세요"
            type="text"
            onChange={handleChangeNickname}
          />
        </div>
        <Link to={`/chatroom?nickname=${name}`}>
          <button className={s.button} type="button">
            채팅 시작하기
          </button>
        </Link>
      </div>
    </div>
  );
}
