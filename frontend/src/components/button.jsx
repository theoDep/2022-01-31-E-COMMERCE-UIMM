export default ({ text, type }) => {
  return (
    <button className="btn w-full max-w-[16rem] m-5" type={type}>
      {text}
    </button>
  );
};
