type ButtonProps = {
  text: string;
  type: "button" | "submit" | "reset" | undefined;
};

export default ({ text, type }: ButtonProps) => {
  return (
    <button className="btn w-full max-w-[16rem] m-5" type={type}>
      {text}
    </button>
  );
};
