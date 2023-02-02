export default ({ currentPath }) => {
  return (
    <div className="text-sm breadcrumbs ml-5">
      <ul>
        <li>
          <a>Home</a>
        </li>
        {currentPath.map((el) => (
          <li>{el}</li>
        ))}
      </ul>
    </div>
  );
};
