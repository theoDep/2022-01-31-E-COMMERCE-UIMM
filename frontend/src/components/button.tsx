type ButtonProps = { text: string };

export default ({ text }: ButtonProps) => {
  return <button className="btn w-full max-w-[16rem] m-5">{text}</button>;
};
