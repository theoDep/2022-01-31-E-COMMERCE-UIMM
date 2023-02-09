import { Link } from "react-router-dom";

type Breadcrumbsprops = { currentPath: string[] };

export default ({ currentPath }: Breadcrumbsprops) => {
  return (
    <div className="text-sm breadcrumbs ml-5">
      <ul>
        <li>
          <Link to="/">
            <a>Home</a>
          </Link>
        </li>
        {currentPath.map((el, index) => (
          <>
            <li key={crypto.randomUUID()}>
              <Link to={`/${currentPath.slice(0, index + 1).join("/")}`}>
                <a>{el}</a>
              </Link>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};
