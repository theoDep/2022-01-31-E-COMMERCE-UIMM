type HorizonDividerProps = { content?: string };

export default ({ content }: HorizonDividerProps) => {
  return <div className="divider">{content}</div>;
};
