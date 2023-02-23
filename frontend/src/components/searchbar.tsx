import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

export default ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();

  return (
    <div className="flex items-center px-5 flex-col">
      {user && <p className="mb-1">Welcome back {user.firstname}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          placeholder="Search"
          {...register("Search", {})}
        />
      </form>
    </div>
  );
};
