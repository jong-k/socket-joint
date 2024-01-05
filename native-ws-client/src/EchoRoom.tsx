import Twemoji from "react-twemoji";

export default function EchoRoom() {
  return (
    <div>
      <h2>메아리 테스트</h2>
      <Twemoji options={{ className: "twemoji" }}>
        <p>
          😂<span>😉</span>
        </p>
      </Twemoji>
    </div>
  );
}
