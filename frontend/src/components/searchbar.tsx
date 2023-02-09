import { useForm } from "react-hook-form";
import { useProducts } from "../hooks/useProducts";

export default ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex justify-center px-5">
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
