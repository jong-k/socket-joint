import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./App.module.scss";

export default function App() {
  const [name, setName] = useState("untitled");
  const navigate = useNavigate();

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleSubmitName = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/chatroom?nickname=${name}`);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.enterName}>
        <h1 className={s.title}>hdx chat</h1>
        <h2 className={s.status}>
          현재 참여중인 사람: <span className={s.activeUserNum}>0</span> 명
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
