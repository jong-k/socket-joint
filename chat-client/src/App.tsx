import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket, queryJoinedUser } from "./socket";
import s from "./App.module.scss";

export default function App() {
  const [isJoined, setIsJoined] = useState(false);
  const [name, setName] = useState("");
  const [activeUserNum, setActiveUserNum] = useState(0);
  const navigate = useNavigate();

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleSubmitName = (e: FormEvent) => {
    e.preventDefault();
    queryJoinedUser(name, () => setIsJoined);
    if (isJoined) {
      window.alert("이미 사용중인 이름입니다.");
    }
    // 상태가 여기서 바ㄱ뀌는구나!
  };

  // useEffect(() => {
  //   const onConnect = () => {};

  //   // const onActiveUserNum = (data: string) => {
  //   //   const newActiveUserNum = JSON.parse(data);
  //   //   setActiveUserNum(newActiveUserNum);
  //   // };

  //   socket.on("connect", onConnect);
  //   // socket.on("activeUserNum", onActiveUserNum);

  //   return () => {
  //     socket.off("connect", onConnect);
  //     // socket.off("activeUserNum", onActiveUserNum);
  //   };
  // }, []);

  // useEffect(() => {
  //   setActiveUserNum(activeUserNum);
  // }, [activeUserNum]);

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
