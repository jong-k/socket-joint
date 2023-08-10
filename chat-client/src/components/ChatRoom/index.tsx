import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { socket, queryActiveUsers } from "../../socket";
import s from "./index.module.scss";

export default function ChatRoom() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const location = useLocation();
  // const navigate = useNavigate();
  const name = location.search.split("?name=")[1];

  const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);

  // const submitMessage = (e: FormEvent) => {
  //   e.preventDefault();
  //   const newMessage = { name, content: message };
  //   setMessages((prev) => [...prev, newMessage]);
  //   socket.emit("messageFromClient", JSON.stringify(newMessage));
  //   setMessage("");
  // };

  // const handleLeaveChatRoom = () => {
  //   const newActiveUsers = activeUsers.filter((user) => user !== name);
  //   setActiveUsers(newActiveUsers);
  //   socket.emit("leave", name);
  //   navigate("/", { replace: true });
  // };

  // const addActiveUser = (username: string) =>
  //   setActiveUsers((prev) => [...prev, username]);

  // const updateActiveUsers = () => {
  //   socket.on("activeUsers", (data: string[]) => {
  //     setActiveUsers(data);
  //   });
  // };

  // const updateMessages = () => {
  //   socket.on("message");
  // };

  useEffect(() => {
    setActiveUsers((prev) => [name, ...prev]);

    socket.emit("enter", name);
    queryActiveUsers(setActiveUsers);

    // const onActiveUsers = (data: string[]) => {
    //   const newActiveUsers = data as string[];
    //   setActiveUsers(newActiveUsers);
    // };

    // const onMessageFromServer = (data: Message) => {
    //   setMessages([...messages, data]);
    // };

    // socket.on("activeUsers", onActiveUsers);
    // socket.on("messageFromServer", onMessageFromServer);
  }, []);

  // useEffect(() => {
  //   // state update
  //   // if (!activeUsers.includes(name)) {
  //   //   setActiveUsers((prev) => [...prev, name]);
  //   // }
  //   const onActiveUsers = (data: string[]) => {
  //     console.log("접속중인 유저 정보가 업데이트되었습니다.");
  //     setActiveUsers(data);
  //   };

  //   socket.on("activeUsers", onActiveUsers);

  //   return () => {
  //     socket.off("activeUsers", onActiveUsers);
  //   };
  // }, [activeUsers.length]);

  // useEffect(() => {
  //   const onMessageFromServer = (data: Message[]) => setMessages(data);

  //   socket.on("messageFromServer", onMessageFromServer);

  //   return () => {
  //     socket.off("messageFromServer", onMessageFromServer);
  //   };
  // }, [messages.length]);

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.main}>
          <div className={s.chat}>
            <div>
              {messages.map((message, idx) => (
                <div key={idx} className={s.messageContainer}>
                  <p className={s.author}>{message.author}:</p>
                  <p className={s.message}>{message.content}</p>
                </div>
              ))}
            </div>
            <form>
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
              {activeUsers.map((user, idx) => (
                <p key={idx}>{user}</p>
              ))}
            </div>
          </div>
        </div>

        <div className={s.leaveButtonBox}>
          <button type="button" className={s.leaveButton}>
            나가기
          </button>
        </div>
      </div>
    </div>
  );
}
