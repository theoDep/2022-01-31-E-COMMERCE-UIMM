type ContentBoxProps = { content: string };

export default ({ content }: ContentBoxProps) => {
  return (
    <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
      {content}
    </div>
  );
};
