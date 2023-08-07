import s from "./index.module.scss";

interface MessageProps {
  message: string;
}

export default function Message({ message }: MessageProps) {
  return <div className={s.message}>{message}</div>;
}
